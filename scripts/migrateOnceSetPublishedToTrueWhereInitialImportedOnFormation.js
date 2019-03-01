// created_at: 2019/03/01
const { connect, disconnect } = require('../server/db');
const Formation = require('../server/models/Formation');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const main = async () => {
  // setup
  await connect();

  const formationIds = [
    '1cb7dac3a4c360b71935e9fcd4ba60ab', // A1 曹純、馬超、張遼
    '31009228bf2702517261503f0aa30ce4', // A2 賈詡、劉備、張機
    '7b3e530f5918c6403fa95ce4c8c1f633', // A3 孫権、甘寧、孫策SP
    '3c1e72fb65463fc36ad9647c4d075724', // A4 霊帝、朱儁SP、何太后
    'a5b167decb0fbf73817e8e54fa621912', // B1 趙雲SP、蜀関羽、黄忠
    '59b95d13a6aecbdbce31db39f50807d5', // B2 夏侯淵、荀彧、曹操
    '9606a6eb1898b725abe5ef92550a74d4', // B3 陸遜SP、周瑜、呂蒙
    'e1cb138dfa585b312e0d74cea7676b9a', // B4 弓呂布、弓諸葛亮、張寧
    '43e0f069ab00049908ab34390a9c45ca', // 大都督（呉レンジャー）
    '8f112238f2392424f26f740360629aae', // 前衛不在の大都督
    '688d618a2fd4261edb5b972681873209', // 中衛不在の大都督
  ];

  await Formation.updateMany(
    { identifier: { $in: formationIds } },
    { published: true }
  );

  // teardown
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
