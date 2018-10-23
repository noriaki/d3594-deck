const { identify, md5 } = require('../concerns/identify');

const tacticsIdentify = (name, origin) => md5(`${name}-${origin}`);

class Tactics {
  // pre('validation') middleware
  static setIdentifier() {
    const identifier = tacticsIdentify(this.name, this.origin);
    this._id = identifier;
    this.identifier = identifier;
  }

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
    const origin = origins[originKey];
    const identifier = tacticsIdentify(name, origin);
    const tactics = await this.findById(identifier) || new this({
      name,
      origin,
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
    if (originKey === 'analyzable' && !tactics.sourceCommanderIds.includes(commanderId)) {
      tactics.sourceCommanderIds.push(commanderId);
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
