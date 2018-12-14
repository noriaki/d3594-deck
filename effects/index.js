import qs from 'qs';
import { filter } from 'rxjs/operators';

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
    .subscribe((commanders) => {
      console.log('effects', commanders);
    });

  return { commanderSearcher, formation };
};

export default effects;
