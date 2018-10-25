const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
const { md5, toIdFromInstance } = require('./concerns/identify');
const FormationClass = require('./classes/Formation');

const { Schema } = mongoose;

const formationSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String },
  commanders: [{
    type: String,
    ref: 'LearnedCommander',
    autopopulate: { options: { retainNullValues: true } },
  }],
});

const identify = (commanderIdsOrInstances) => {
  const commanderIds = commanderIdsOrInstances.map(toIdFromInstance);
  return md5(commanderIds.join());
};

function setIdentifier() {
  const identifier = identify(this.commanders);
  this._id = identifier;
}

async function createAssociation(commanders, name) {
  const identifier = identify(commanders);
  let formation = await this.findById(identifier);
  if (formation == null) {
    const commanderIds = commanders.map(toIdFromInstance);
    formation = new this({
      name,
      commanders: commanderIds,
    });
    await formation.save();
  }
  return formation;
}
formationSchema.static('createAssociation', createAssociation);

function fetchById(id) { return this.findById(id); }
formationSchema.static('fetchById', fetchById);

formationSchema.plugin(mongooseAutoPopulatePlugin);
formationSchema.pre('validate', setIdentifier);

formationSchema.loadClass(FormationClass);
const FormationModel = (
  mongoose.models.Formation || mongoose.model('Formation', formationSchema)
);

module.exports = FormationModel;
