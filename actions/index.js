import set from 'lodash.set';

// classes
import LearnedCommander from '../server/models/classes/LearnedCommander';

export const searchActions = (store) => {
  const setTarget = (path) => {
    store.set('target')(path);
  };

  const updateText = (value) => {
    const { text, ...other } = store.get('query');
    store.set('query')({ ...other, text: value });
  };

  const updateFilter = (target, value) => {
    const { filter, ...other } = store.get('query');
    const nextFilter = { ...filter, [target]: value };
    store.set('query')({ ...other, filter: nextFilter });
  };

  const selectData = data => () => {
    store.set('select')(data);
  };

  return {
    setTarget,
    updateText,
    updateFilter,
    selectData,
  };
};

export const formationActions = (store) => {
  const removePathData = (path) => {
    const commanders = store.get('commanders');
    set(commanders, path, null);
    store.set('commanders')(commanders);
  };

  const removeCommander = removePathData;
  const removeTactics = removePathData;

  return {
    removeCommander,
    removeTactics,
  };
};

export const tacticsActions = () => {
  const generateId = (targetType, position, index) => {
    const { tactics } = LearnedCommander.paths(position);
    return `${targetType}_${tactics[index]}`;
  };

  const scrollToTactics = id => (event) => {
    event.preventDefault();
    const offset = 8 * 8;
    let scrollY;
    if (window.pageYOffset !== undefined) {
      scrollY = window.pageYOffset;
    } else {
      const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
      scrollY = isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
    }
    const { top } = document.getElementById(id).getBoundingClientRect();
    window.scroll({ top: top + scrollY - offset, behavior: 'smooth' });
  };

  return {
    generateId,
    scrollToTactics,
  };
};

export default {
  searchActions,
  formationActions,
};
