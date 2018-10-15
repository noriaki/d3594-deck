const { identify, md5 } = require('../concerns/identify');

class Tactics {
  static async import(json, originKey, commanderId) {
    const origins = { init: '固有(初期)', analyzable: '分析' };
    const {
      name,
      type,
      permissions,
      rate,
      distance,
      target,
      description,
    } = json;
    const identifier = md5(name);
    const tactics = await this.findById(identifier) || new this({
      name,
      origin: origins[originKey],
      type,
      permissions,
      rate,
      distance,
      target,
      description,
    });
    if (originKey === 'init' && !tactics.ownerIds.includes(commanderId)) {
      tactics.ownerIds.push(commanderId);
    }
    if (originKey === 'analyzable' && !tactics.commanderIds.includes(commanderId)) {
      tactics.commanderIds.push(commanderId);
    }
    return tactics.save();
  }

  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  static async importAll(jsons) {
    for (const data of jsons) {
      const { tactics, ...json } = data;
      const commanderId = identify(json);
      if (tactics.init != null) {
        await this.import(tactics.init, 'init', commanderId);
      }
      await Promise.all(tactics.analyzables.filter(
        analyzable => (analyzable !== null)
      ).map(
        analyzable => this.import(analyzable, 'analyzable', commanderId)
      ));
    }
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop */

  static getDataPath() { return './data/commanders/'; }
}

module.exports = Tactics;
