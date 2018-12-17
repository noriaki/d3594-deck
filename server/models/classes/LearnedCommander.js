const { md5, toIdFromInstance } = require('../concerns/identify');

class LearnedCommander {
  static identify(cIdOrIns, tIdsOrInses) {
    const cId = toIdFromInstance(cIdOrIns);
    const tIds = tIdsOrInses.map(toIdFromInstance);
    return md5(`${cId}(${tIds.join()})`);
  }

  get humanize() {
    const additionalTacticsNames = this.additionalTactics.map(
      t => (t != null ? t.name : '未習得')
    );
    return `${this.commander.id} (${additionalTacticsNames.join(', ')})`;
  }
}

module.exports = LearnedCommander;
