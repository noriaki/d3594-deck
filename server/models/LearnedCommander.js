const mongoose = require('mongoose');
const LearnedCommanderClass = require('./classes/LearnedCommander');

const { Schema } = mongoose;

const learnedCommanderSchema = new Schema({
  _id: { type: String },
  identifier: { type: String },
  commander: { type: String, ref: 'Commander' },
  tactics: { type: String, ref: 'Tactics' },
  additionalTactics: [{ type: String, ref: 'Tactics' }],
});

learnedCommanderSchema.pre('validate', LearnedCommanderClass.setIdentifier);

learnedCommanderSchema.loadClass(LearnedCommanderClass);
const LearnedCommanderModel = (
  mongoose.models.LearnedCommander || mongoose.model('LearnedCommander', learnedCommanderSchema)
);

module.exports = LearnedCommanderModel;
