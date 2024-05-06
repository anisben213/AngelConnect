require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const bodyParser = require("body-parser");
const Startup = require("../models/startupOwner");
const JWT = require("jsonwebtoken");
const { checkCred } = require("../middlewares/validation");
const { validationResult } = require("express-validator");
const Investor = require("../models/businessAngel");

exports.registerInvestorController = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, company } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const token = JWT.sign({ lastName, firstName }, process.env.JWT_SECRET, {
      expiresIn: 100000,
    });
    const newInvestor = new Investor({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      company,
    });
    const savedInvestor = await newInvestor.save();
    res.status(200).json({
      token: token,
      message: "investor registered successfully",
      investor: savedInvestor,
    });
  } catch (error) {
    console.error("Error registering investor:", error);
    res.status(500).json({
      message: "Error registering investor",
      error: error.message,
    });
  }
};

exports.registerStartupController = async (req, res) => {
  const { firstName, lastName, phone, email, password, startup, category } =
    req.body;
  const newStartup = new Startup({
    firstName,
    lastName,
    email,
    password,
    phone,
    startup,
    category,
  });
  await newStartup.save();
};

exports.loginInvestor = async (req, res) => {
  const { email, password } = req.body;
  const user = await Investor.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      message: " incorrect informations, please enter a valid credentials",
    });
  }
  console.log("Entered password:", password);
console.log("Stored hashed password:", user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);
  if (!isMatch) {
    return res.status(400).json({
      message: "incorrect password",
    });
  }
  res.json({
    message : "logged in done"
  })
};
