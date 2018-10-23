const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
const LearnedCommanderClass = require('./classes/LearnedCommander');

const { Schema } = mongoose;

const learnedCommanderSchema = new Schema({
  _id: { type: String },
  identifier: { type: String },
  commander: {
    type: String,
    ref: 'Commander',
    autopopulate: true,
  },
  tactics: {
    type: String,
    ref: 'Tactics',
    autopopulate: true,
  },
  additionalTactics: [{
    type: String,
    ref: 'Tactics',
    autopopulate: { options: { retainNullValues: true } },
  }],
});

learnedCommanderSchema.plugin(mongooseAutoPopulatePlugin);
learnedCommanderSchema.pre('validate', LearnedCommanderClass.setIdentifier);

learnedCommanderSchema.loadClass(LearnedCommanderClass);
const LearnedCommanderModel = (
  mongoose.models.LearnedCommander || mongoose.model('LearnedCommander', learnedCommanderSchema)
);

module.exports = LearnedCommanderModel;
