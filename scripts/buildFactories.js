const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const getAllDataLocal = (type) => {
  const path = `./data/${type}.json`;
  return JSON.parse(readFileSync(resolve(path), 'utf8'));
};

const main = async () => {
  // commanders
  const commanders = getAllDataLocal('commanders');
  const commanderIds = [
    '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬 (駆逐, 回避)
    '29fb183da598388eee0cd2f73832de8e', // 呂蒙
    '30f401ff9134eb74663697174aa3ff10', // 周瑜
    '5abed51fa17562728f0b54288c547c56', // 朱儁
    '6709e590857413afa7934777258e9d2f', // 孫堅, 戦必断金
    '9daf2ffe7eec142b9231445a8ee7d831', // 水淹七軍(龐統)
    'a083468786c98194d8955d0aa7085a56', // 掎角之勢(荀彧・荀攸)
    'a9f7deacd67d08a2ea7ff2d4255b4171', // 反計之策(張角)
    'b31f84c829733146801b5935d7891e73', // 董荼那 (頑抗)
    'c78a48266ec5166844c7df427834a520', // 渾水摸魚(張春華)
    'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜
  ];
  const commanderFactories = commanders.filter(
    c => commanderIds.includes(c.identifier)
  );
  const commanderFactoriesPath = './server/models/__factories__/commanders.json';
  writeFileSync(
    resolve(commanderFactoriesPath),
    JSON.stringify(commanderFactories, null, 2)
  );

  // tactics
  const tactics = getAllDataLocal('tactics');
  const tacticsIds = [
    '19b519c1849ff3d5171138f205e6dbd7', // 形兵之極-典籍
    'ae8a6d9abc29bcd38ca84ec1553f8f62', // 形兵列陣-季専用
    '89e523917d80d64315b7479efee8f98b', // 桃園結義-典蔵
    'da77fbec8ae42d646aca4e1959dc6378', // 健卒不殆-分析
    '7f13b5ee6d3d5983e272b3a719edba2e', // 火積-分析
  ];
  const tacticsFactories = tactics.filter(
    t => tacticsIds.includes(t.identifier)
  );
  const tacticsFactoriesPath = './server/models/__factories__/tactics.json';
  writeFileSync(
    resolve(tacticsFactoriesPath),
    JSON.stringify(tacticsFactories, null, 2)
  );
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
