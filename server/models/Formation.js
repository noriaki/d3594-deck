const mongoose = require('mongoose');
const mongooseAutoPopulatePlugin = require('mongoose-autopopulate');
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

formationSchema.plugin(mongooseAutoPopulatePlugin);
formationSchema.pre('validate', FormationClass.setIdentifier);

formationSchema.loadClass(FormationClass);
const FormationModel = (
  mongoose.models.Formation || mongoose.model('Formation', formationSchema)
);

module.exports = FormationModel;
