const isString = require('lodash.isstring');
const { md5 } = require('../concerns/identify');

const CommanderModel = require('../Commander');
const TacticsModel = require('../Tactics');

const toInstanceFromId = async (commanderId, additionalTacticsIds) => ([
  isString(commanderId) ? await CommanderModel.findById(commanderId) : commanderId,
  await Promise.all(additionalTacticsIds.map(
    id => (isString(id) ? TacticsModel.findById(id) : id)
  )),
]);

const toIdFromInstance = (commander, additionalTactics) => ([
  isString(commander) ? commander : commander._id,
  additionalTactics.map(t => (isString(t) ? t : t._id)),
]);

const stringId = async (commanderInstanceOrId, additionalTacticsInstancesOrIds) => {
  const [commander, additionalTactics] = await toInstanceFromId(
    commanderInstanceOrId, additionalTacticsInstancesOrIds
  );
  const additionalTacticsNames = additionalTactics.map(t => t.name);
  return `${commander.id} (${additionalTacticsNames.join(', ')})`;
};

const identify = (commanderIdOrInstance, additionalTacticsIdsOrInstances) => {
  const [commanderId, additionalTacticsIds] = toIdFromInstance(
    commanderIdOrInstance, additionalTacticsIdsOrInstances
  );
  return md5(`${commanderId}(${additionalTacticsIds.join()})`);
};

class LearnedCommander {
  static async setIdentifier() {
    const identifier = await identify(this.commander, this.additionalTactics);
    this._id = identifier;
    this.identifier = identifier;
  }

  static async createAssociation(commanderInstanceOrId, additionalTacticsInstancesOrIds = []) {
    const identifier = identify(commanderInstanceOrId, additionalTacticsInstancesOrIds);
    let lc = await this.findById(identifier);
    if (lc == null) {
      const [commander, additionalTactics] = await toInstanceFromId(
        commanderInstanceOrId, additionalTacticsInstancesOrIds
      );
      const specificTactics = await commander.specificTactics();
      lc = new this({
        commander: commander._id,
        tactics: specificTactics._id,
        additionalTactics: additionalTactics.map(t => t._id),
      });
      await lc.save();
    }
    return lc;
  }

  // async
  toString() {
    return stringId(this.commander, this.additionalTactics);
  }
}

module.exports = LearnedCommander;
