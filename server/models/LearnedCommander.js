const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
const { md5, toIdFromInstance } = require('./concerns/identify');
const TacticsModel = require('./Tactics');
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

const identify = (commanderIdOrInstance, additionalTacticsIdsOrInstances) => {
  const commanderId = toIdFromInstance(commanderIdOrInstance);
  const additionalTacticsIds = additionalTacticsIdsOrInstances.map(
    toIdFromInstance
  );
  return md5(`${commanderId}(${additionalTacticsIds.join()})`);
};

function setIdentifier() {
  const identifier = identify(this.commander, this.additionalTactics);
  this._id = identifier;
  this.identifier = identifier;
}

async function setSpecificTactics() {
  const commanderId = toIdFromInstance(this.commander);
  const specificTactics = await TacticsModel.fetchByOwnerId(commanderId);
  this.tactics = specificTactics._id;
}

function fillAdditionalTactics() {
  // const { additionalTactics } = this;
  this.additionalTactics = [...Array(2)].map(
    (_, i) => (toIdFromInstance(this.additionalTactics[i]) || null)
  );
}

async function createAssociation(commander, additionalTactics = []) {
  const identifier = identify(commander, additionalTactics);
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
