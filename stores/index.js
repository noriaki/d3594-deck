import { createConnectedStoreAs } from 'undux';

import effects from '../effects';

export const initialFormation = {
  name: null,
  humanize: null,
  commanders: [null, null, null],
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
      rarity: [5, 4],
      army: ['弓', '歩', '騎'],
      team: ['群', '漢', '魏', '蜀', '呉'],
    },
  },
  results: null,
  select: null,
};

export const initialTacticsSearcher = {
  init: false,
  open: false,
  query: {
    text: '',
    filter: {
      origin: ['典蔵', '典籍', '季専用', '分析'],
      type: ['指揮', '主動', '追撃', '受動'],
      permissions: ['弓', '歩', '騎'],
    },
  },
  results: null,
  select: null,
};

export const initialStates = {
  formation: initialFormation,
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
