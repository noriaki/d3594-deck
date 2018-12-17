const { md5, toIdFromInstance } = require('../concerns/identify');

const positions = ['本営', '中衛', '前衛'];

const stringId = commanders => positions.map((position, index) => {
  const commander = commanders[index];
  const commanderStringId = commander != null ? commander.humanize : '未配置';
  return `${position}：${commanderStringId}`;
}).join('\n');

class Formation {
  static get positions() { return positions; }

  static identify = (cIdsOrInses) => {
    const cIds = cIdsOrInses.map(toIdFromInstance);
    return md5(cIds.join());
  };

  get humanize() { return stringId(this.commanders); }

  get siege() {
    const siegeValues = this.commanders.filter(
      c => (c && c.commander && c.commander.maxStatus)
    ).map(
      ({ commander }) => (commander.maxStatus.siege)
    );
    return Math.floor(
      siegeValues.reduce((total, current) => (total + current), 0)
    );
  }

  get velocity() {
    const velocityValues = this.commanders.filter(
      c => (c && c.commander && c.commander.maxStatus)
    ).map(
      ({ commander }) => (commander.maxStatus.velocity)
    );
    return Math.floor(Math.min(...velocityValues));
  }

  get cost() {
    const costValues = this.commanders.filter(c => (c && c.commander)).map(
      ({ commander }) => (commander.cost)
    );
    return costValues.reduce((total, current) => (total + current), 0);
  }
}

module.exports = Formation;
