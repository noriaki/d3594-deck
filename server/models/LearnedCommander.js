const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
const { toIdFromInstance } = require('./concerns/identify');
const TacticsModel = require('./Tactics');
const LearnedCommanderClass = require('./classes/LearnedCommander');

const { Schema } = mongoose;

const learnedCommanderSchema = new Schema({
  _id: { type: String, required: true },
  identifier: { type: String, default: null, required: true },
  commander: {
    type: String,
    default: null,
    ref: 'Commander',
    autopopulate: true,
  },
  tactics: {
    type: String,
    default: null,
    ref: 'Tactics',
    autopopulate: true,
  },
  additionalTactics: {
    type: [{
      type: String,
      ref: 'Tactics',
      autopopulate: { options: { retainNullValues: true } },
    }],
    default: [null, null],
  },
});

function setIdentifier() {
  const identifier = LearnedCommanderClass.identify(
    this.commander, this.additionalTactics
  );
  this._id = identifier;
  this.identifier = identifier;
}

async function setSpecificTactics() {
  const commanderId = toIdFromInstance(this.commander);
  const specificTactics = await TacticsModel.fetchByOwnerId(commanderId);
  this.tactics = specificTactics._id;
}

function fillAdditionalTactics() {
  this.additionalTactics = [...Array(2)].map(
    (_, i) => (toIdFromInstance(this.additionalTactics[i]) || null)
  );
}

async function createAssociation(commander, additionalTactics = []) {
  const identifier = LearnedCommanderClass.identify(
    commander, additionalTactics
  );
  const commanderId = toIdFromInstance(commander);
  const additionalTacticsIds = additionalTactics.map(toIdFromInstance);
  let lc = await this.findById(identifier);
  if (lc == null) {
    lc = new this({
      commander: commanderId,
      additionalTactics: additionalTacticsIds,
    });
    await lc.save();
  }
  return lc;
}
learnedCommanderSchema.static('createAssociation', createAssociation);

learnedCommanderSchema.plugin(mongooseAutoPopulatePlugin);
learnedCommanderSchema.pre('validate', setSpecificTactics);
learnedCommanderSchema.pre('validate', fillAdditionalTactics);
learnedCommanderSchema.pre('validate', setIdentifier);

learnedCommanderSchema.loadClass(LearnedCommanderClass);
const LearnedCommanderModel = (
  mongoose.models.LearnedCommander || mongoose.model('LearnedCommander', learnedCommanderSchema)
);

module.exports = LearnedCommanderModel;
