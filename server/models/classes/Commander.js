const Tactics = require('../Tactics');

class Commander {
  // @async method
  static import(json) {
    const {
      name,
      special,
      description,
      rarity,
      cost,
      team,
      army,
      distance,
      image,
      status,
    } = json;
    const commander = new this({
      name,
      special,
      description,
      rarity,
      cost,
      team,
      army,
      distance,
      image,
      maxStatus: status.max,
      minStatus: status.min,
      deltaStatus: status.delta,
    });
    return commander.save();
  }

  // @async method
  static importAll(jsons) {
    return Promise.all(jsons.map(json => this.import(json)));
  }

  static getDataPath() { return './data/commanders/'; }

  // @async
  specificTactics() {
    return Tactics.fetchByOwnerId(this._id);
  }
}

module.exports = Commander;
