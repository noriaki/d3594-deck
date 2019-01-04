import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import Router from 'next/router';
import qs from 'qs';
import get from 'lodash.get';
import set from 'lodash.set';
import has from 'lodash.has';

import { typeOf, indexOf } from './concerns/target';
import compose from './concerns/compose';

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
  const { formation, searcher, commanderSearcher } = stores;

  searcher
    .on('target')
    .pipe(map(typeOf))
    .subscribe((target) => {
      switch (target) {
      case 'commander':
        commanderSearcher.set('open')(true);
        break;

      case 'tactics':
        // tacticsSearcher.set('open')(true);
        break;

      default:
        commanderSearcher.set('open')(false);
        // tacticsSearcher.set('open')(false);
        break;
      }
    });

  commanderSearcher
    .on('query')
    .subscribe(fetchData(commanderSearcher, 'c'));

  commanderSearcher
    .on('init')
    .pipe(
      filter(init => init)
    )
    .subscribe(() => (
      fetchData(commanderSearcher, 'c')(commanderSearcher.get('query'))
    ));

  const notNull = item => item !== null;
  const haveTactics = data => has(data, 'tactics');
  const buildCommander = ({ commander, tactics = null }) => ({
    commander,
    tactics,
    additionalTactics: [null, null],
  });
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
      if (data != null) {
        const commanders = [...formation.get('commanders')];
        const commander = buildCommander(data);
        set(commanders, target, commander);
        formation.set('commanders')(commanders);
        if (haveTactics(data)) { commanderSearcher.set('select')(null); }
      }
    });

  // TODO: case Honei is null => not save but pushState
  const validCommanders = f => (f.length === 3 && f[0] != null);
  const notHaveTactics = data => !haveTactics(data);
  const allExistsHaveSpecificTactics = items => !items.some(
    item => (notNull(item) && notHaveTactics(item))
  );
  const toQuery = commanders => commanders.map((c) => {
    if (c === null) { return null; }
    const commanderId = get(c, 'commander.identifier');
    const commander = { identifier: commanderId };
    const additionalTactics = c.additionalTactics.map(
      t => (t && t.identifier && { identifier: t.identifier })
    );
    return { commander, additionalTactics };
  });

  combineLatest(
    formation.on('commanders').pipe(filter(validCommanders)),
    commanderSearcherSelectStream
  )
    .pipe(
      filter(([, select]) => select === null),
      filter(([commanders]) => allExistsHaveSpecificTactics(commanders)),
      map(([commanders]) => toQuery(commanders))
    )
    .subscribe(async (query) => {
      if (commanderSearcher.get('select') != null) { return; }
      const response = await fetch('/api/v1/f', {
        ...headersForAPI, method: 'POST', body: JSON.stringify(query),
      });
      if (response.ok && [200, 201].includes(response.status)) {
        const { identifier, name, humanize } = await response.json();
        const path = `/f/edit?id=${identifier}`;
        const as = `/f/${identifier}/edit`;
        Router.push(path, as, { shallow: true });
        formation.set('name')(name);
        formation.set('humanize')(humanize);
      }
    });

  const toCommanderIdentifier = d => get(d, 'commander.identifier');
  commanderSearcherSelectStream
    .pipe(filter(notNull), filter(notHaveTactics), map(toCommanderIdentifier))
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
