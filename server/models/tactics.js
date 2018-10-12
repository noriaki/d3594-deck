const mongoose = require('mongoose');
const TacticsClass = require('./classes/tactics');

const { Schema } = mongoose;

const tacticsSchema = new Schema({
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
  sacrificeIds: [String],
  // effects: [EffectSchema],
});

tacticsSchema.loadClass(TacticsClass);
const TacticsModel = mongoose.models.Tactics || mongoose.model('Tactics', tacticsSchema);

module.exports = TacticsModel;
