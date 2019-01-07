import has from 'lodash.has';
import negate from 'lodash.negate';

import { notNull, notNil } from './existance';

// unit size is 3, `honei` exists
export const validCommanders = data => (
  data.length === 3 && notNil(data[0])
);
export const haveTactics = data => has(data, 'tactics');
export const notHaveTactics = negate(haveTactics);
export const allExistsHaveTactics = items => !items.some(
  item => (notNull(item) && notHaveTactics(item))
);
