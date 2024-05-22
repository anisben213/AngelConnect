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
  const { firstName, lastName, phone, email, password, company } = req.body;
  try {
    const exist = await Investor.findOne({ email });
    if (exist) {
      res.status(400).json({ message: "email already exist" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newInvestor = new Investor({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      company,
      type: "investor",
    });
    const savedInvestor = await newInvestor.save();
    const token = JWT.sign({ _id: savedInvestor._id }, process.env.JWT_SECRET, {
      expiresIn: 100000,
    });
    res.status(201).json({
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
  try {
    const exist = await Startup.findOne({ email });
    if (exist) {
      res.status(400).json({
        message: "email already exist",
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newStartup = new Startup({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      startup,
      category,
      type: "startupper",
    });
    const savedStartup = await newStartup.save();
    const token = JWT.sign({ _id: savedStartup._id }, process.env.JWT_SECRET, {
      expiresIn: 100000,
    });
    res.status(201).json({
      token: token,
      message: "startup owner registered successfully",
      startup: savedStartup,
    });
  } catch (error) {
    console.error("Error registering startupper:", error);
    res.status(500).json({
      message: "Error registering startupper",
      error: error.message,
    });
  }
};
//LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Investor.findOne({email})
    let userType ='investor'

    if (!user) {
       user = await Startup.findOne({email})
       userType= 'startupper'
    }
  if(!user) {
    res.status(404).json({message:"no users were found with this email"})
  }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 100000,
    });
    res.status(200).json({
      message: "user logged in successfully",
      user: user,
      token: token,
      userType:userType,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};
