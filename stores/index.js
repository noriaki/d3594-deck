import { createConnectedStoreAs } from 'undux';

import effects from '../effects';

const initialCommanderSearcher = {
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
}, effects);

export default { Container, withStores };
