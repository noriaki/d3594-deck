import qs from 'qs';
import { filter } from 'rxjs/operators';
import get from 'lodash.get';
import set from 'lodash.set';

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

const effects = ({ commanderSearcher, formation }) => {
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

  formation
    .on('commanders')
    .pipe(
      filter(commanders => (
        commanders.length === 3 && !commanders.every(c => c == null)
      ))
    )
    .subscribe(async (commanders) => {
      console.log(commanders);
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
      const results = await response.json();
      console.log(response, results);
    });

  return { commanderSearcher, formation };
};

export default effects;
