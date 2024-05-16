const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verify");
const Investor = require("../models/businessAngel");
const Startup = require("../models/startupOwner");

exports.getStartuppers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = req.query.filter || {};

  try {
    const startuppers = await Startup.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(startuppers);
  } catch (error) {
    console.error("Error fetching startuppers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getInvestors = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = req.query.filter || {};

  try {
    const investors = await Investor.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(investors);
  } catch (error) {
    console.error("Error fetching investors :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user._id;
    let user =
      (await Investor.findById(userId)) || (await Startup.findById(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await Promise.any([
      Investor.findById(userId),
      Startup.findById(userId),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
