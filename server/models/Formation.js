const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
const { toIdFromInstance } = require('./concerns/identify');
const LearnedCommander = require('./LearnedCommander');
const FormationClass = require('./classes/Formation');

const { Schema } = mongoose;

const formationSchema = new Schema({
  _id: { type: String, required: true },
  identifier: { type: String, default: null, required: true },
  name: { type: String, default: null },
  commanders: {
    type: [{
      type: String,
      ref: 'LearnedCommander',
      autopopulate: { options: { retainNullValues: true } },
    }],
    default: [null, null, null],
  },
});

function setIdentifier() {
  const identifier = FormationClass.identify(this.commanders);
  this._id = identifier;
  this.identifier = identifier;
}

function fillCommanders() {
  this.commanders = [...Array(3)].map(
    (_, i) => (toIdFromInstance(this.commanders[i]) || null)
  );
}

async function createAssociation(commanders, name) {
  const identifier = FormationClass.identify(commanders);
  let formation = await this.findById(identifier);
  if (formation == null) {
    const commanderIds = commanders.map(toIdFromInstance);
    formation = new this({
      name,
      commanders: commanderIds,
    });
    await formation.save();
  }
  return formation;
}
formationSchema.static('createAssociation', createAssociation);

function fetchById(id) { return this.findById(id); }
formationSchema.static('fetchById', fetchById);


async function importSampleData() {
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
      LearnedCommander.createAssociation(commanderId, tacticsIds[i])
    )
  ));
  // /f/43e0f069ab00049908ab34390a9c45ca
  await this.createAssociation(commanders, '大都督（呉レンジャー）');
  const immatureCommander = await LearnedCommander.createAssociation(
    commanderIds[1], [null, tacticsIds[1][1]]
  );
  // /f/8f112238f2392424f26f740360629aae
  await this.createAssociation(
    [commanders[0], immatureCommander], '前衛不在の大都督'
  );
  // /f/688d618a2fd4261edb5b972681873209
  await this.createAssociation(
    [commanders[0], null, immatureCommander], '中衛不在の大都督'
  );
}

formationSchema.static('importSampleData', importSampleData);

formationSchema.plugin(mongooseAutoPopulatePlugin);
formationSchema.pre('validate', fillCommanders);
formationSchema.pre('validate', setIdentifier);

formationSchema.loadClass(FormationClass);
const FormationModel = (
  mongoose.models.Formation || mongoose.model('Formation', formationSchema)
);

module.exports = FormationModel;
