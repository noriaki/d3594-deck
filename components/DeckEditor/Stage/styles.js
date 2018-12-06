import merge from 'lodash.merge';

const styles = theme => ({});

export const baseStyles = theme => merge({}, styles(theme), {
});

export const searchStyles = theme => merge({}, styles(theme), {
});

export default {
  baseStyles,
  searchStyles,
};
