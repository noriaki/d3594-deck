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
  mode: null,
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

export const initialStates = {
  formation: initialFormation,
  searcher: initialSearcher,
  commanderSearcher: initialCommanderSearcher,
};

export const { Container, withStores } = createConnectedStoreAs(
  initialStates, effects
);

export default {
  Container,
  withStores,
  initialStates,
};
