const mongoose = require('mongoose');
const FormationClass = require('./classes/Formation');
const { humanizeId, identify } = require('./concerns/identify');

const { Schema } = mongoose;

const formationSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String },
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
  this._id = identifier; // eslint-disable-line no-underscore-dangle
  this.id = id;
  this.identifier = identifier;
}
formationSchema.pre('validate', setIdentifier);

formationSchema.loadClass(FormationClass);
const FormationModel = mongoose.models.Formation || mongoose.model('Formation', formationSchema);

module.exports = FormationModel;
