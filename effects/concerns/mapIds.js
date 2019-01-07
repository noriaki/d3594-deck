import get from 'lodash.get';

const mapIds = (list, initial = { pathToIds: {}, idToPaths: {} }) => {
  const commanders = Array.isArray(list) ? list : list.commanders;
  return commanders.reduce((ret, c, i) => {
    const paths = [
      'commander',
      'additionalTactics[0]',
      'additionalTactics[1]',
    ];
    return paths.reduce((r, p) => {
      const id = get(c, `${p}.identifier`, null);
      const path = `[${i}].${p}`;
      const nextRet = { ...r, pathToIds: { ...r.pathToIds, [path]: id } };
      if (id != null) {
        return {
          ...nextRet,
          idToPaths: { ...r.idToPaths, [id]: path },
        };
      }
      return nextRet;
    }, ret);
  }, initial);
};

export default mapIds;
