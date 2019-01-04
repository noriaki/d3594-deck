import negate from 'lodash.negate';
import isNil from 'lodash.isnil';
import isNull from 'lodash.isnull';

export const notNull = negate(isNull);
export const notNil = negate(isNil);
export const isTrue = item => item === true;
