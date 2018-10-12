const mongoose = require('mongoose');
const { MaxStatus, MinStatus, DeltaStatus } = require('./status');
const CommanderClass = require('./classes/commander');

const { Schema } = mongoose;

const commanderSchema = new Schema({
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
  maxStatus: MaxStatus.schema,
  minStatus: MinStatus.schema,
  deltaStatus: DeltaStatus.schema,
});

commanderSchema.loadClass(CommanderClass);
const CommanderModel = mongoose.models.Commander || mongoose.model('Commander', commanderSchema);

module.exports = CommanderModel;
