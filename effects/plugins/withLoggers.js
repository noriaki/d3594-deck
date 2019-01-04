const withLoggers = (stores) => {
  if (typeof window === 'undefined') {
    return stores;
  }
  return Object.entries(stores).reduce((ret, [name, store]) => {
    store.onAll().subscribe(({ key, previousValue, value }) => {
      console.info(
        `%c \u2941 ${name}.${key}`,
        'background-color: rgb(96, 125, 139); color: #fff; padding: 2px 8px 2px 0;',
        previousValue,
        '\u2192',
        value
      );
    });
    return { ...ret, [name]: store };
  }, {});
};

export default withLoggers;
