const { md5, toIdFromInstance } = require('../concerns/identify');

class LearnedCommander {
  static initialize() {
    const instance = new this();
    instance.identifier = null;
    instance.commander = null;
    instance.tactics = null;
    instance.additionalTactics = [null, null];
    return instance;
  }

  static identify(cIdOrIns, tIdsOrInses) {
    const cId = toIdFromInstance(cIdOrIns);
    const tIds = tIdsOrInses.map(toIdFromInstance);
    return md5(`${cId}(${tIds.join()})`);
  }

  static paths(position) {
    return {
      index: `[${position}]`,
      commander: `[${position}].commander`,
      tactics: [
        `[${position}].tactics`,
        `[${position}].additionalTactics[0]`,
        `[${position}].additionalTactics[1]`,
      ],
    };
  }

  get humanize() {
    const additionalTacticsNames = this.additionalTactics.map(
      t => (t != null ? t.name : '未習得')
    );
    return `${this.commander.id} (${additionalTacticsNames.join(', ')})`;
  }
}

module.exports = LearnedCommander;
