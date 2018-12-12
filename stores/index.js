import { createConnectedStoreAs, withReduxDevtools } from 'undux';

import effects from '../effects';

export const initialFormation = {
  commanders: [null, null, null],
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

const { Container, withStores } = createConnectedStoreAs({
  commanderSearcher: initialCommanderSearcher,
  formation: initialFormation,
}, (stores) => {
  if (typeof window === 'undefined') {
    return effects(stores);
  }
  return effects(Object.entries(stores).reduce((ret, [name, store]) => ({
    ...ret, [name]: withReduxDevtools(store),
  }), {}));
});

export default {
  Container,
  withStores,
  initialStates: {
    formation: initialFormation,
    commanderSearcher: initialCommanderSearcher,
  },
};
