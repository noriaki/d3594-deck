const formation = [
  {
    commander: 'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜
    tactics: [
      '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻
      '57ab3a19350045df5dfcf65ed187792a', // 十面埋伏
    ],
  },
  {
    commander: '30f401ff9134eb74663697174aa3ff10', // 周瑜
    tactics: [
      '270f3fbedde0140b6c679b17d79df385', // 水淹七軍
      'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚
    ],
  },
  {
    commander: '29fb183da598388eee0cd2f73832de8e', // 呂蒙
    tactics: [
      '967e6d8582235fe4682e46708c6f0752', // 掎角之勢
      'c44f950c80d01601ec8bf31f75d89a40', // 反計之策
    ],
  },
];

const immatureCommander = {
  commander: '30f401ff9134eb74663697174aa3ff10', // 周瑜
  tactics: [
    null,
    'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚
  ],
};

module.exports = {
  formation,
  immatureCommander,
};
