import set from 'lodash.set';

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
  const removeCommander = (path) => {
    const commanders = store.get('commanders');
    set(commanders, path, null);
    store.set('commanders')(commanders);
  };

  const removeTactics = (identifier) => {/*
    const commanders = store.get('commanders');
    let isChange = false;
    const nextCommanders = commanders.map((commander) => {
      if (commander === null) { return commander; }
      const targetIndex = commander.additionalTactics.findIndex(tactics => (
        (tactics || {}).identifier === identifier
      ));
      if (targetIndex > -1) {
        commander.additionalTactics.splice(targetIndex, 1, null);
        isChange = true;
      }
      return commander;
    });
    if (isChange) { store.set('commanders')(nextCommanders); }
  */};

  return {
    removeCommander,
    removeTactics,
  };
};

export default {
  searchActions,
  formationActions,
};
