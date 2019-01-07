import isNull from 'lodash.isnull';
import get from 'lodash.get';
import pick from 'lodash.pick';

export const buildCommander = ({ commander, tactics = null }) => ({
  commander,
  tactics,
  additionalTactics: [null, null],
});
export const toCommanderIdentifier = data => (
  get(data, 'commander.identifier')
);
export const toQueryForCreateFormationAPI = commanders => commanders.map(
  (data) => {
    if (isNull(data)) { return null; }
    const commander = pick(data.commander, 'identifier');
    const additionalTactics = data.additionalTactics.map(
      tactics => (tactics && pick(tactics, 'identifier'))
    );
    return { commander, additionalTactics };
  }
);
