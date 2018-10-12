const { identify, md5 } = require('../concerns/identify');

class Tactics {
  static async import(json, originKey, sacrificeId) {
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
    const tactics = await this.findOne({ identifier }) || new this({
      identifier,
      name,
      origin: origins[originKey],
      type,
      permissions,
      rate,
      distance,
      target,
      description,
    });
    if (!tactics.sacrificeIds.includes(sacrificeId)) {
      tactics.sacrificeIds.push(sacrificeId);
    }
    return tactics.save();
  }

  // @async method
  static importAll(jsons) {
    return Promise.all(jsons.map(({ tactics, ...json }) => {
      const commanderId = identify(json);
      const promises = [];
      if (tactics.init != null) {
        promises.push(this.import(tactics.init, 'init', commanderId));
      }
      promises.concat(tactics.analyzables.filter(
        analyzable => (analyzable !== null)
      ).map(
        analyzable => this.import(analyzable, 'analyzable', commanderId)
      ));
      return Promise.all(promises);
    }));
  }

  static getDataPath() { return './data/commanders/'; }
}

module.exports = Tactics;
