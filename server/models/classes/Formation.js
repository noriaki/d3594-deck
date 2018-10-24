const isString = require('lodash.isstring');

const LearnedCommanderModel = require('../LearnedCommander');

const positions = ['本営', '中衛', '前衛'];

// async
const toInstanceFromId = commanderIdOrInstance => (
  isString(commanderIdOrInstance)
    ? LearnedCommanderModel.findById(commanderIdOrInstance)
    : commanderIdOrInstance
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

class Formation {
  // async
  toString() { return stringId(this.commanders); }

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

  static async importSampleData() {
    const commanderIds = [
      'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜
      '30f401ff9134eb74663697174aa3ff10', // 周瑜
      '29fb183da598388eee0cd2f73832de8e', // 呂蒙
    ];
    const tacticsIds = [
      [
        '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻
        '57ab3a19350045df5dfcf65ed187792a', // 十面埋伏
      ],
      [
        '270f3fbedde0140b6c679b17d79df385', // 水淹七軍
        'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚
      ],
      [
        '967e6d8582235fe4682e46708c6f0752', // 掎角之勢
        'c44f950c80d01601ec8bf31f75d89a40', // 反計之策
      ],
    ];
    const commanders = await Promise.all(commanderIds.map(
      (commanderId, i) => (
        LearnedCommanderModel.createAssociation(commanderId, tacticsIds[i])
      )
    ));
    return this.createAssociation(commanders, '大都督（呉レンジャー）');
  }
}

module.exports = Formation;
