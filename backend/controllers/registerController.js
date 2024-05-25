require("dotenv").config();  // Load environment variables from .env file
const bcrypt = require("bcryptjs");  // Library for hashing passwords
const express = require("express");  // Express framework for building web applications
const bodyParser = require("body-parser");  // Middleware for parsing request bodies
const Startup = require("../models/startupOwner");  // Mongoose model for startup owners
const JWT = require("jsonwebtoken");  // Library for creating and verifying JSON Web Tokens
const { checkCred } = require("../middlewares/validation");  // Custom middleware for validation (not shown)
const { validationResult } = require("express-validator");  // Middleware for validating request data
const Investor = require("../models/businessAngel");  // Mongoose model for business angels (investors)

// Controller function to register a new investor
exports.registerInvestorController = async (req, res) => {
  const { firstName, lastName, phone, email, password, company } = req.body;  // Destructure the request body
  try {
    // Check if the email already exists
    const exist = await Investor.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate the request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new investor instance
    const newInvestor = new Investor({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      company,
      type: "investor",
    });

    // Save the new investor to the database
    const savedInvestor = await newInvestor.save();
    res.status(201).json({
      message: "Investor registered successfully",
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

// Controller function to register a new startup owner
exports.registerStartupController = async (req, res) => {
  const { firstName, lastName, phone, email, password, startup, category } = req.body;  // Destructure the request body
  try {
    // Check if the email already exists
    const exist = await Startup.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate the request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new startup owner instance
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

    // Save the new startup owner to the database
    const savedStartup = await newStartup.save();
    res.status(201).json({
      message: "Startup owner registered successfully",
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

// Controller function to handle user login
exports.login = async (req, res) => {
  const { email, password } = req.body;  // Destructure the request body
  try {
    // Check if the user is an investor
    let user = await Investor.findOne({ email });
    let userType = 'investor';

    // If not found, check if the user is a startup owner
    if (!user) {
      user = await Startup.findOne({ email });
      userType = 'startupper';
    }

    // If no user is found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: "No users were found with this email" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return a 400 response
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate a JSON Web Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the user data and token in the response
    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone, email: user.email, password: user.password },
      token: token,
      userType: userType,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};
