export const searchActions = (store) => {
  const setTargetByIdentifier = (identifier) => {
    const path = store.get('idToPaths')[identifier];
    store.set('target')(path);
  };

  const selectIdentifier = identifier => store.set('select')(identifier);

  return {
    setTargetByIdentifier,
    selectIdentifier,
  };
};

export const commanderSearchActions = (store) => {
  const updateText = (value) => {
    const { text, ...other } = store.get('query');
    store.set('query')({ ...other, text: value });
  };

  const updateFilter = (target, value) => {
    const { filter, ...other } = store.get('query');
    const nextFilter = { ...filter, [target]: value };
    store.set('query')({ ...other, filter: nextFilter });
  };

  return {
    updateText,
    updateFilter,
  };
};

export const formationActions = (store) => {
  const removeCommander = (identifier) => {
    const commanders = store.get('commanders');
    const targetIndex = commanders.findIndex((c) => {
      if (c === null) { return false; }
      return c.commander.identifier === identifier;
    });
    if (targetIndex > -1) {
      commanders[targetIndex] = null;
      store.set('commanders')(commanders);
    }
  };

  const removeTactics = (identifier) => {
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
  };

  return {
    removeCommander,
    removeTactics,
  };
};

export default {
  searchActions,
  commanderSearchActions,
  formationActions,
};
