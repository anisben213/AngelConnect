const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  startup: { type: String },
  category: { type: String, required: true },
  type: { type: String, enum: ["startupper"], required: true },
});

const Startup = mongoose.model("startupowner", startupSchema);

module.exports = Startup;
