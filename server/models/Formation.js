const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
const { toIdFromInstance } = require('./concerns/identify');
const LearnedCommander = require('./LearnedCommander');
const FormationClass = require('./classes/Formation');
const sampleFormationData = require('../../data/init/formations/sample');
const halloweenCupFormationData = require('../../data/init/formations/halloweenCup');

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
  published: { type: Boolean, default: false, required: true },
});
formationSchema.set('timestamps', true);

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

async function createAssociation(commanders, name, published = false) {
  const identifier = FormationClass.identify(commanders);
  let formation = await this.fetchById(identifier);
  if (formation == null) {
    const commanderIds = commanders.map(toIdFromInstance);
    formation = new this({
      name,
      published,
      commanders: commanderIds,
    });
    await formation.save();
  }
  return formation;
}
formationSchema.static('createAssociation', createAssociation);

// @async
function fetchById(identifier) { return this.findOne({ identifier }); }
formationSchema.static('fetchById', fetchById);

formationSchema.query.fullOfCommanders = function fullOfCommanders() {
  return this.where({ commanders: { $size: 3, $nin: [null] } });
};

function findLatest(options = { limit: 3 }) {
  const mergedOptions = { ...options, sort: { updatedAt: 'desc' } };
  return this
    .find({ published: true })
    .fullOfCommanders()
    .setOptions(mergedOptions);
}
formationSchema.static('findLatest', findLatest);

async function importSampleData() {
  const commanders = await Promise.all(sampleFormationData.formation.map(
    ({ commander, tactics }) => (
      LearnedCommander.createAssociation(commander, tactics)
    )
  ));
  // /f/43e0f069ab00049908ab34390a9c45ca
  await this.createAssociation(commanders, '大都督（呉レンジャー）', true);

  const immatureData = sampleFormationData.immatureCommander;
  const immatureCommander = await LearnedCommander.createAssociation(
    immatureData.commander, immatureData.tactics
  );
  // /f/8f112238f2392424f26f740360629aae
  await this.createAssociation(
    [commanders[0], immatureCommander], '前衛不在の大都督', true
  );
  // /f/688d618a2fd4261edb5b972681873209
  await this.createAssociation(
    [commanders[0], null, immatureCommander], '中衛不在の大都督', true
  );
}

formationSchema.static('importSampleData', importSampleData);

async function importHalloweenCupData() {
  const keys = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'];
  await Promise.all(halloweenCupFormationData.map((formation, i) => (
    Promise.all(formation.map(({ commander, tactics }) => (
      LearnedCommander.createAssociation(commander, tactics)
    ))).then(commanders => (
      this.createAssociation(commanders, `ハロウィン杯:${keys[i]}`, true)
    ))
  )));
}
formationSchema.static('importHalloweenCupData', importHalloweenCupData);

formationSchema.plugin(mongooseAutoPopulatePlugin);
formationSchema.pre('validate', fillCommanders);
formationSchema.pre('validate', setIdentifier);

formationSchema.loadClass(FormationClass);
const FormationModel = (
  mongoose.models.Formation || mongoose.model('Formation', formationSchema)
);

module.exports = FormationModel;
