const mongoose = require('mongoose');
const FormationClass = require('./classes/Formation');

const { Schema } = mongoose;

const formationSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String },
  commanders: [{ type: String, ref: 'LearnedCommander' }],
});

formationSchema.pre('validate', FormationClass.setIdentifier);

formationSchema.loadClass(FormationClass);
const FormationModel = (
  mongoose.models.Formation || mongoose.model('Formation', formationSchema)
);

module.exports = FormationModel;
