const mongoose = require('mongoose');
const { identify, md5 } = require('./concerns/identify');
const TacticsClass = require('./classes/Tactics');
const { baseArmy } = require('./classes/Commander');

const { Schema } = mongoose;
const { baseTypes, baseOrigin } = TacticsClass;

const tacticsSchema = new Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  identifier: { type: String, required: true },
  name: { type: String, required: true },
  stage: [{ type: String, enum: ['S1', 'S2', 'S3', 'XP'] }],
  origin: { type: String, enum: baseOrigin },
  type: { type: String, enum: baseTypes },
  permissions: [{ type: String, enum: baseArmy }],
  stock: { type: Number },
  rate: { type: String },
  distance: { type: String },
  target: { type: String },
  description: { type: String },
  ownerIds: [String],
  sourceCommanderIds: [String],
  sortKey: { type: String, required: true },
  originalId: { type: String },
  // effects: [EffectSchema],
});

const tacticsIdentify = (name, origin) => md5(`${name}-${origin}`);

function setIdentifier() {
  const identifier = tacticsIdentify(this.name, this.origin);
  this._id = identifier;
  this.id = identifier;
  this.identifier = identifier;
}

tacticsSchema.pre('validate', setIdentifier);

/*
 * sort by:
 *   1. type['指揮', '主動', '追撃', '受動']
 *   2. origin['典蔵', '典籍', '季専用', '分析', '固有(初期)']
 *   3. stock(asc)
 *   4. stage.length(desc)
 *   5. originalId(asc)
 *   6. identifier(asc)
 */
function setSortKey() {
  const type = baseTypes.indexOf(this.type);
  const origin = baseOrigin.indexOf(this.origin);
  const stock = this.stock != null ? this.stock : 9;
  const stage = this.stage.length;
  const orgId = this.originalId != null ? this.originalId : '999999';
  const identifier = this.identifier.slice(0, 6);
  this.sortKey = [type, origin, stock, stage, orgId, identifier].join('/');
}
tacticsSchema.pre('validate', setSortKey);

// @async
function fetchById(identifier) { return this.findOne({ identifier }); }
tacticsSchema.static('fetchById', fetchById);

// async
function fetchByOwnerId(identifier) {
  return this.findOne({ ownerIds: identifier, origin: '固有(初期)' });
}
tacticsSchema.static('fetchByOwnerId', fetchByOwnerId);

async function importData(json, originKey, commanderId) {
  const {
    name,
    stage: stageText,
    origin,
    type,
    permissions,
    stock,
    rate,
    distance,
    target,
    description,
    originalId,
  } = json;
  const identifier = tacticsIdentify(name, origin);
  const stage = stageText.split(/[\s,]+/);
  const tactics = await this.fetchById(identifier) || new this({
    name,
    stage,
    origin,
    type,
    permissions,
    stock,
    rate,
    distance,
    target,
    description,
    originalId,
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
async function importAll(commanders, otherTactics) {
  const tacticsIds = [];
  for (const commander of commanders) {
    const { tactics, ...json } = commander;
    const commanderId = identify(json);
    if (tactics.init != null) {
      tacticsIds.push(
        await this.importData(tactics.init, 'init', commanderId)
      );
    }
    tacticsIds.concat(await Promise.all(tactics.analyzables.filter(
      analyzable => (analyzable !== null)
    ).map(
      analyzable => this.importData(analyzable, 'analyzable', commanderId)
    )));
  }
  await Promise.all(
    otherTactics
      .filter(({ identifier }) => !tacticsIds.includes(identifier))
      .map(this.importData.bind(this))
  );
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
