const mongoose = require('mongoose');
const TacticsClass = require('./classes/Tactics');
const { md5 } = require('./concerns/identify');

const { Schema } = mongoose;

const tacticsSchema = new Schema({
  _id: { type: String, required: true },
  identifier: { type: String, required: true },
  name: { type: String, required: true },
  stage: { type: Number },
  origin: {
    type: String,
    enum: ['固有(初期)', '分析', '典籍', '特有(擁立)', '特有(割拠)'],
  },
  type: { type: String, enum: ['指揮', '主動', '追撃', '受動'] },
  permissions: [{ type: String, enum: ['弓', '歩', '騎'] }],
  rate: { type: String },
  distance: { type: String },
  target: { type: String },
  description: { type: String },
  ownerIds: [String],
  commanderIds: [String],
  // effects: [EffectSchema],
});

function setIdentifier() {
  const identifier = md5(this.name);
  this._id = identifier; // eslint-disable-line no-underscore-dangle
  this.identifier = identifier;
}
tacticsSchema.pre('validate', setIdentifier);

tacticsSchema.loadClass(TacticsClass);
const TacticsModel = mongoose.models.Tactics || mongoose.model('Tactics', tacticsSchema);

module.exports = TacticsModel;
