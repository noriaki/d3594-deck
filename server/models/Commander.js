const mongoose = require('mongoose');
const { MaxStatus, MinStatus, DeltaStatus } = require('./Status');
const Tactics = require('./Tactics');
const CommanderClass = require('./classes/Commander');
const { humanizeId, identify } = require('./concerns/identify');

const { Schema } = mongoose;

const commanderSchema = new Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  identifier: { type: String, required: true },
  name: { type: String, required: true },
  stage: { type: Number },
  special: { type: String, enum: ['SE', 'JE', 'SP', 'XP', 'S2', 'S3', null] },
  description: { type: String },
  rarity: { type: Number, required: true },
  cost: { type: Number, required: true },
  team: { type: String, required: true, enum: ['群', '魏', '蜀', '呉', '漢'] },
  army: { type: String, required: true, enum: ['弓', '歩', '騎'] },
  distance: { type: Number, required: true },
  image: { type: String },
  sortKey: { type: String, required: true },
  maxStatus: MaxStatus.schema,
  minStatus: MinStatus.schema,
  deltaStatus: DeltaStatus.schema,
});

function setIdentifier() {
  const {
    name,
    rarity,
    special,
    team,
    army,
  } = this;
  const id = humanizeId({
    name,
    rarity,
    special,
    team,
    army,
  });
  const identifier = identify(id);
  this._id = identifier;
  this.id = id;
  this.identifier = identifier;
}
commanderSchema.pre('validate', setIdentifier);

function setSortKey() {
  const { baseRarity, baseArmy, baseTeam } = CommanderClass;
  const rarity = baseRarity.indexOf(this.rarity);
  const cost = 100 - Math.floor(this.cost * 10);
  const army = baseArmy.indexOf(this.army);
  const team = baseTeam.indexOf(this.team);
  this.sortKey = [
    rarity > -1 ? rarity : baseRarity.length,
    cost,
    team > -1 ? team : baseTeam.length,
    army > -1 ? army : baseArmy.length,
    this.identifier.slice(0, 6),
  ].join('/');
}
commanderSchema.pre('validate', setSortKey);

// @async
function specificTactics() {
  return Tactics.fetchByOwnerId(this._id);
}

commanderSchema.method('specificTactics', specificTactics);

// @async method
function importData(json) {
  const {
    name,
    special,
    description,
    rarity,
    cost,
    team,
    army,
    distance,
    image,
    status,
  } = json;
  const commander = new this({
    name,
    special,
    description,
    rarity,
    cost,
    team,
    army,
    distance,
    image,
    maxStatus: status.max,
    minStatus: status.min,
    deltaStatus: status.delta,
  });
  return commander.save();
}

commanderSchema.static('importData', importData);

// @async method
function importAll(jsons) {
  return Promise.all(jsons.map(json => this.importData(json)));
}

commanderSchema.static('importAll', importAll);

const getDataPath = () => './data/commanders/';

commanderSchema.static('getDataPath', getDataPath);

commanderSchema.loadClass(CommanderClass);
const CommanderModel = (
  mongoose.models.Commander || mongoose.model('Commander', commanderSchema)
);

module.exports = CommanderModel;
