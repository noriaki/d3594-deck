const mongoose = require('mongoose');
const { identify, md5 } = require('./concerns/identify');
const TacticsClass = require('./classes/Tactics');

const { Schema } = mongoose;

const tacticsSchema = new Schema({
  _id: { type: String, required: true },
  identifier: { type: String, required: true },
  name: { type: String, required: true },
  stage: [Number],
  origin: {
    type: String,
    enum: ['固有(初期)', '分析', '典蔵', '典籍', '季専用'],
  },
  type: { type: String, enum: ['指揮', '主動', '追撃', '受動'] },
  permissions: [{ type: String, enum: ['弓', '歩', '騎'] }],
  rate: { type: String },
  distance: { type: String },
  target: { type: String },
  description: { type: String },
  ownerIds: [String],
  sourceCommanderIds: [String],
  // effects: [EffectSchema],
});

const tacticsIdentify = (name, origin) => md5(`${name}-${origin}`);

function setIdentifier() {
  const identifier = tacticsIdentify(this.name, this.origin);
  this._id = identifier;
  this.identifier = identifier;
}

tacticsSchema.pre('validate', setIdentifier);

// async
function fetchByOwnerId(id) {
  return this
    .where('ownerIds').in(id).where('origin', '固有(初期)').findOne();
}

tacticsSchema.static('fetchByOwnerId', fetchByOwnerId);

async function importData(json, originKey, commanderId) {
  const origins = { init: '固有(初期)', analyzable: '分析' };
  const {
    name,
    type,
    permissions,
    rate,
    distance,
    target,
    description,
  } = json;
  const origin = origins[originKey];
  const identifier = tacticsIdentify(name, origin);
  const tactics = await this.findById(identifier) || new this({
    name,
    origin,
    type,
    permissions,
    rate,
    distance,
    target,
    description,
  });
  if (originKey === 'init' && !tactics.ownerIds.includes(commanderId)) {
    tactics.ownerIds.push(commanderId);
  }
  if (originKey === 'analyzable' && !tactics.sourceCommanderIds.includes(commanderId)) {
    tactics.sourceCommanderIds.push(commanderId);
  }
  return tactics.save();
}

tacticsSchema.static('importData', importData);

/* eslint-disable no-restricted-syntax, no-await-in-loop */
async function importAll(jsons) {
  for (const data of jsons) {
    const { tactics, ...json } = data;
    const commanderId = identify(json);
    if (tactics.init != null) {
      await this.importData(tactics.init, 'init', commanderId);
    }
    await Promise.all(tactics.analyzables.filter(
      analyzable => (analyzable !== null)
    ).map(
      analyzable => this.importData(analyzable, 'analyzable', commanderId)
    ));
  }
}
/* eslint-enable no-restricted-syntax, no-await-in-loop */

tacticsSchema.static('importAll', importAll);

const getDataPath = () => './data/commanders/';

tacticsSchema.static('getDataPath', getDataPath);

tacticsSchema.loadClass(TacticsClass);
const TacticsModel = (
  mongoose.models.Tactics || mongoose.model('Tactics', tacticsSchema)
);

module.exports = TacticsModel;
