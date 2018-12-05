import qs from 'qs';
import { filter } from 'rxjs/operators';

export const fetchData = (store, path) => async (query) => {
  store.set('results')(null);
  const uri = `/api/v1/${path}?${qs.stringify(query)}`;
  const response = await fetch(uri, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
  const results = await response.json();
  store.set('results')(results);
};

const effects = ({ commanderSearcher }) => {
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

  return { commanderSearcher };
};

export default effects;
