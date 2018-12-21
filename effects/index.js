import qs from 'qs';
import { filter } from 'rxjs/operators';
import get from 'lodash.get';
import set from 'lodash.set';
import Router from 'next/router';

import mapIds from './concerns/mapIds';
import compose from './concerns/compose';

import withLoggers from './withLoggers';

export const fetchData = (store, path) => async (query) => {
  if (store.get('results') !== null) { store.set('results')(null); }
  const uri = `/api/v1/${path}?${qs.stringify(query)}`;
  const response = await fetch(uri, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
  const results = await response.json();
  store.set('results')(results);
};

const effects = ({ formation, searcher, commanderSearcher }) => {
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

  const validCommanders = cs => (cs.length === 3 && !cs.every(c => c == null));
  formation
    .on('commanders')
    .pipe(filter(validCommanders))
    .subscribe((commanders) => {
      const { pathToIds, idToPaths } = mapIds(commanders);
      searcher.set('pathToIds')(pathToIds);
      searcher.set('idToPaths')(idToPaths);
      searcher.set('target')(null);
    });

  formation
    .on('commanders')
    .pipe(filter(validCommanders))
    .subscribe(async (commanders) => {
      const query = commanders.map((c) => {
        if (c === null) { return null; }
        const commanderId = get(c, 'commander.identifier', null);
        const commander = { identifier: commanderId };
        const additionalTactics = c.additionalTactics.map(
          t => (t && t.identifier && { identifier: t.identifier })
        );
        return { commander, additionalTactics };
      });
      const response = await fetch('/api/v1/f', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(query),
      });
      if (response.ok && [200, 201].includes(response.status)) {
        const { identifier } = await response.json();
        const path = `/f/edit?id=${identifier}`;
        const as = `/f/${identifier}/edit`;
        Router.push(path, as, { shallow: true });
      }
    });

  searcher
    .on('select')
    .pipe(filter(s => s !== null))
    .subscribe(async (identifier) => {
      const path = searcher.get('target');
      if (path == null) { return; }
      const [posIndex, type] = path.split('.');
      if (type === 'commander') { // case: commander
        const response = await fetch(`/api/v1/c/${identifier}`, {
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        });
        if (response.ok && response.status === 200) {
          const { commander, tactics } = await response.json();
          const commanders = formation.get('commanders');
          set(commanders, path, commander);
          set(commanders, `${posIndex}.tactics`, tactics);
          set(commanders, `${posIndex}.additionalTactics`, [null, null]);
          formation.set('commanders')(commanders);
        }
      }
      searcher.set('select')(null);
    });

  return { commanderSearcher, searcher, formation };
};

export default compose(withLoggers, effects);
