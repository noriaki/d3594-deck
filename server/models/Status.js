const mongoose = require('mongoose');
const merge = require('lodash.merge');

const { Schema } = mongoose;

const schemaOption = {
  type: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['max', 'min', 'delta'],
  },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  siege: { type: Number, required: true },
  velocity: { type: Number, required: true },
};

const maxStatusSchema = new Schema(
  merge({}, schemaOption, { type: { default: 'max' } })
);
const minStatusSchema = new Schema(
  merge({}, schemaOption, { type: { default: 'min' } })
);
const deltaStatusSchema = new Schema(
  merge({}, schemaOption, { type: { default: 'delta' } })
);

const MaxStatus = mongoose.models.Status
        || mongoose.model('MaxStatus', maxStatusSchema);
const MinStatus = mongoose.models.Status
        || mongoose.model('MinStatus', minStatusSchema);
const DeltaStatus = mongoose.models.Status
        || mongoose.model('DeltaStatus', deltaStatusSchema);

module.exports = {
  MaxStatus,
  MinStatus,
  DeltaStatus,
};
