const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  company: { type: String },
  type: { type: String, enum: ['investor'], required: true }
});

const Investor = mongoose.model("investor", investorSchema);

module.exports = Investor;
