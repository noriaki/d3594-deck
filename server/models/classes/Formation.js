const positions = ['本営', '中衛', '前衛'];

const stringId = commanders => positions.map((position, index) => {
  const commander = commanders[index];
  const commanderStringId = commander != null ? commander.humanize : '無し';
  return `${position}：${commanderStringId}`;
}).join('\n');

class Formation {
  static get positions() { return positions; }

  get humanize() { return stringId(this.commanders); }

  get siege() {
    const siegeValues = this.commanders.map(
      ({ commander }) => (commander.maxStatus.siege)
    );
    return Math.floor(
      siegeValues.reduce((total, current) => (total + current))
    );
  }

  get velocity() {
    const velocityValues = this.commanders.map(
      ({ commander }) => (commander.maxStatus.velocity)
    );
    return Math.floor(Math.min(...velocityValues));
  }

  get cost() {
    const costValues = this.commanders.map(
      ({ commander }) => (commander.cost)
    );
    return costValues.reduce((total, current) => (total + current));
  }
}

module.exports = Formation;
