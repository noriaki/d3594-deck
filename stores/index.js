import { createConnectedStoreAs } from 'undux';

import effects from '../effects';

export const initialFormation = {
  identifier: null,
  name: null,
  humanize: '',
  commanders: [null, null, null],
  published: false,
};

export const initialApiHandler = {
  publishing: null,
};

export const initialSearcher = {
  target: null,
};

export const initialCommanderSearcher = {
  init: false,
  open: false,
  query: {
    text: '',
    filter: {
      rarity: [5],
      army: ['弓', '歩', '騎'],
      team: ['群', '漢', '魏', '蜀', '呉'],
      distance: [5, 4, 3, 2, 1],
      cost: [4, 3.5, 3, 2.5, 2],
    },
  },
  results: null,
  select: null,
  acquirer: null,
};

export const initialTacticsSearcher = {
  init: false,
  open: false,
  query: {
    text: '',
    filter: {
      origin: ['典蔵', '典籍', '季専用', '分析', '任務'],
      type: ['指揮', '主動', '追撃', '受動'],
      permissions: ['弓', '歩', '騎'],
    },
    group: 'type',
  },
  results: null,
  select: null,
  acquirer: null,
};

export const initialStates = {
  formation: initialFormation,
  apiHandler: initialApiHandler,
  searcher: initialSearcher,
  commanderSearcher: initialCommanderSearcher,
  tacticsSearcher: initialTacticsSearcher,
};

export const { Container, withStores } = createConnectedStoreAs(
  initialStates, effects
);

export default {
  Container,
  withStores,
  initialStates,
};
