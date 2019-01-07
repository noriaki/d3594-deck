const commanderRegexp = /commander/;
const tacticsRegexp = /additionalTactics/;

export const typeOf = (target) => {
  if (commanderRegexp.test(target)) {
    return 'commander';
  } else if (tacticsRegexp.test(target)) {
    return 'tactics';
  }
  return null;
};

const indexRegexp = /^(\[[0-2]\])/;

export const indexOf = (target) => {
  const m = indexRegexp.exec(target);
  return m && m[1];
};

export default {
  typeOf,
  indexOf,
};
