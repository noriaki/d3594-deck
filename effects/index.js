import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import Router from 'next/router';
import qs from 'qs';

// utils
import set from 'lodash.set';
import isNil from 'lodash.isnil';
import isNull from 'lodash.isnull';

import { typeOf, indexOf } from './concerns/target';
import compose from './concerns/compose';

// filters
import { notNull, notNil, isTrue } from './filters/existance';
import {
  validCommanders,
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
      formation.set('commanders')(commanders);
      if (haveTactics(data)) { commanderSearcher.set('select')(null); }
    });

  combineLatest(searcher.on('target'), tacticsSearcher.on('select'))
    .subscribe(([target, data]) => {
      if (isNil(target) || isNil(data)) { return; }
      const commanders = [...formation.get('commanders')];
      const { tactics } = data;
      set(commanders, target, tactics);
      formation.set('commanders')(commanders);
      tacticsSearcher.set('select')(null);
    });

  // TODO: case Honei is null => not save but pushState
  combineLatest(
    formation.on('commanders').pipe(filter(validCommanders)),
    commanderSearcherSelectStream
  )
    .pipe(
      filter(([, select]) => isNull(select)),
      filter(([commanders]) => allExistsHaveTactics(commanders)),
      map(([commanders]) => toQueryForCreateFormationAPI(commanders))
    )
    .subscribe(async (query) => {
      if (notNil(commanderSearcher.get('select'))) { return; }
      const response = await fetch('/api/v1/f', {
        ...headersForAPI, method: 'POST', body: JSON.stringify(query),
      });
      if (response.ok && [200, 201].includes(response.status)) {
        const { identifier, name, humanize } = await response.json();
        const path = `/f/edit?id=${identifier}`;
        const as = `/f/${identifier}/edit`;
        Router.push(path, as);
        formation.set('name')(name);
        formation.set('humanize')(humanize);
      }
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

export default compose(withLoggers, effects);
