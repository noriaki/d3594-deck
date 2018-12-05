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

export default {
  commanderSearchActions,
};
