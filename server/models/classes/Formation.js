const isString = require('lodash.isstring');
const { md5 } = require('../concerns/identify');

const LearnedCommanderModel = require('../LearnedCommander');

const positions = ['本営', '中衛', '前衛'];

// async
const toInstanceFromId = commanderIdOrInstance => (
  isString(commanderIdOrInstance)
    ? LearnedCommanderModel.findById(commanderIdOrInstance)
    : commanderIdOrInstance
);

const toIdFromInstance = commander => (
  (isString(commander) || commander == null) ? commander : commander._id
);

// async
const stringId = commanderIdsOrInstances => Promise.all(
  positions.map(async (position, index) => {
    const idOrInstance = commanderIdsOrInstances[index];
    const commander = await toInstanceFromId(idOrInstance);
    const commanderStringId = (
      commander != null ? await commander.toString() : '無し'
    );
    return `${position}：${commanderStringId}`;
  })
).then(stringIds => stringIds.join('\n'));

const identify = (commanderIdsOrInstances) => {
  const commanderIds = commanderIdsOrInstances.map(toIdFromInstance);
  return md5(commanderIds.join());
};

class Formation {
  static setIdentifier() {
    const identifier = identify(this.commanders);
    this._id = identifier;
  }

  // @async method
  static async createAssociation(commanders, name) {
    const identifier = identify(commanders);
    let formation = await this.findById(identifier);
    if (formation == null) {
      const commanderIds = commanders.map(toIdFromInstance);
      formation = new this({
        name,
        commanders: commanderIds,
      });
      await formation.save();
    }
    return formation;
  }

  // async
  toString() { return stringId(this.commanders); }
}

module.exports = Formation;
