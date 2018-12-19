import { createConnectedStoreAs } from 'undux';

import effects from '../effects';

export const initialFormation = {
  commanders: [null, null, null],
};

export const initialSearcher = {
  pathToIds: {},
  idToPaths: {},
  target: null,
  select: null,
};

export const initialCommanderSearcher = {
  init: false,
  query: {
    text: '',
    filter: {
      rarity: [5, 4],
      army: ['弓'/*, '歩', '騎'*/],
      team: ['群', '漢', '魏', '蜀', '呉'],
    },
  },
  results: null,
};

const compose = (...funcs) => (
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg)
);

const withLoggers = (stores) => {
  if (typeof window === 'undefined') {
    return stores;
  }
  return Object.entries(stores).reduce((ret, [name, store]) => {
    store.onAll().subscribe(({ key, previousValue, value }) => {
      console.info(
        `%c \u2941 ${name}.${key}`,
        'background-color: rgb(96, 125, 139); color: #fff; padding: 2px 8px 2px 0;',
        previousValue,
        '\u2192',
        value
      );
    });
    return { ...ret, [name]: store };
  }, {});
};

export const { Container, withStores } = createConnectedStoreAs({
  formation: initialFormation,
  searcher: initialSearcher,
  commanderSearcher: initialCommanderSearcher,
}, compose(withLoggers, effects));

export default {
  Container,
  withStores,
  initialStates: {
    formation: initialFormation,
    searcher: initialSearcher,
    commanderSearcher: initialCommanderSearcher,
  },
};
