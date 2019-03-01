import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import Router from 'next/router';
import qs from 'qs';

// utils
import get from 'lodash.get';
import set from 'lodash.set';
import isNil from 'lodash.isnil';

import { typeOf, indexOf } from './concerns/target';
import compose from './concerns/compose';

// filters
import { notNull, notNil, isTrue } from './filters/existance';
import {
  haveTactics,
  notHaveTactics,
  allExistsHaveTactics,
} from './filters/commanders';

// mappers
import {
  buildCommander,
  toCommanderIdentifier,
  toQueryForCreateFormationAPI,
} from './mappers/commanders';

import withLoggers from './plugins/withLoggers';

const headersForAPI = {
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
};

export const fetchData = (store, path) => async (query) => {
  if (store.get('results') !== null) { store.set('results')(null); }
  const uri = `/api/v1/${path}?${qs.stringify(query)}`;
  const response = await fetch(uri, headersForAPI);
  const results = await response.json();
  store.set('results')(results);
};

const effects = (stores) => {
  const {
    formation,
    apiHandler,
    searcher,
    commanderSearcher,
    tacticsSearcher,
  } = stores;

  searcher
    .on('target')
    .pipe(map(typeOf))
    .subscribe((target) => {
      switch (target) {
      case 'commander':
        commanderSearcher.set('open')(true);
        break;

      case 'tactics':
        tacticsSearcher.set('open')(true);
        break;

      default:
        commanderSearcher.set('open')(false);
        tacticsSearcher.set('open')(false);
        break;
      }
    });

  searcher
    .on('target')
    .pipe(filter(notNull))
    .subscribe((target) => {
      const commanders = [...formation.get('commanders')];
      const commander = get(commanders, `${indexOf(target)}.commander`, null);
      if (typeOf(target) === 'commander') {
        commanderSearcher.set('acquirer')(commander);
      } else if (typeOf(target) === 'tactics') {
        tacticsSearcher.set('acquirer')(commander);
      }
    });

  commanderSearcher
    .on('query')
    .subscribe(fetchData(commanderSearcher, 'c'));

  commanderSearcher
    .on('init')
    .pipe(filter(isTrue))
    .subscribe(() => (
      fetchData(commanderSearcher, 'c')(commanderSearcher.get('query'))
    ));

  tacticsSearcher
    .on('query')
    .subscribe(fetchData(tacticsSearcher, 't'));

  tacticsSearcher
    .on('init')
    .pipe(filter(isTrue))
    .subscribe(() => (
      fetchData(tacticsSearcher, 't')(tacticsSearcher.get('query'))
    ));

  const indexOfTargetStream = searcher.on('target').pipe(
    filter(notNull), map(indexOf)
  );

  const commanderSearcherSelectStream = commanderSearcher.on('select').pipe(
    startWith(null)
  );
  const commanderSelectionStream = combineLatest(
    indexOfTargetStream,
    commanderSearcherSelectStream
  );

  commanderSelectionStream
    .subscribe(([target, data]) => {
      if (isNil(data)) { return; }
      const commanders = [...formation.get('commanders')];
      const commander = buildCommander(data);
      set(commanders, target, commander);
      if (haveTactics(data)) { commanderSearcher.set('select')(null); }
      formation.set('commanders')(commanders);
    });

  combineLatest(searcher.on('target'), tacticsSearcher.on('select'))
    .subscribe(([target, data]) => {
      if (isNil(target) || isNil(data)) { return; }
      const commanders = [...formation.get('commanders')];
      const { tactics } = data;
      set(commanders, target, tactics);
      tacticsSearcher.set('select')(null);
      searcher.set('target')(null);
      formation.set('commanders')(commanders);
    });

  // TODO: case Honei is null => not save but pushState
  formation.on('commanders')
    .pipe(
      filter(allExistsHaveTactics),
      map(toQueryForCreateFormationAPI)
    )
    .subscribe(async (query) => {
      if (notNil(commanderSearcher.get('select'))
          || notNil(tacticsSearcher.get('select'))) { return; }
      const response = await fetch('/api/v1/f', {
        ...headersForAPI, method: 'POST', body: JSON.stringify(query),
      });
      if (response.ok && [200, 201].includes(response.status)) {
        const {
          identifier,
          name,
          humanize,
          published,
        } = await response.json();
        const path = `/f/edit?id=${identifier}`;
        const as = `/f/${identifier}/edit`;
        formation.set('identifier')(identifier);
        formation.set('name')(name);
        formation.set('humanize')(humanize);
        formation.set('published')(published);
        Router.push(path, as);

        // prefetch og:image
        const { hostname } = new URL(document.URL);
        if (hostname === 'deck.d3594.com') {
          fetch(
            `https://d3594-ss.now.sh/${identifier}.png`,
            { mode: 'cors', redirect: 'manual' }
          );
        } else if (hostname === 'deck-stg.d3594.com') {
          fetch(
            `https://d3594-ss-stg.now.sh/${identifier}.png`,
            { mode: 'cors', redirect: 'manual' }
          );
        }
      }
    });

  apiHandler.on('publishing')
    .pipe(filter(notNull))
    .subscribe(async (identifier) => {
      const response = await fetch(`/api/v1/f/${identifier}`, {
        ...headersForAPI,
        method: 'PUT',
        body: JSON.stringify({ published: true }),
      });
      if (response.ok) {
        const path = `/f?id=${identifier}`;
        const as = `/f/${identifier}`;
        Router.push(path, as);
      }
      apiHandler.set('publishing')(null);
    });

  commanderSearcherSelectStream
    .pipe(
      filter(notNull),
      filter(notHaveTactics),
      map(toCommanderIdentifier)
    )
    .subscribe(async (identifier) => {
      const response = await fetch(`/api/v1/c/${identifier}`, headersForAPI);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        commanderSearcher.set('select')(data);
      }
      searcher.set('target')(null);
    });

  return stores;
};

const finalEffects = (
  process.env.NODE_ENV === 'development'
    ? compose(withLoggers, effects)
    : effects
);

export default finalEffects;
