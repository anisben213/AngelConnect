const express = require("express");
const Investor = require("../models/businessAngel");
const Startup = require("../models/startupOwner");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Get all startuppers with pagination
exports.getStartuppers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const startuppers = await Startup.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalCount = await Startup.countDocuments();

    // Set response headers for pagination
    res.set("x-total-pages", Math.ceil(totalCount / limit));
    res.set('Access-Control-Expose-Headers', 'x-total-pages');
    res.json(startuppers);
  } catch (error) {
    console.error("Error fetching startuppers :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all investors with pagination
exports.getInvestors = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const investors = await Investor.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalCount = await Investor.countDocuments();

    // Set response headers for pagination
    res.set("x-total-pages", Math.ceil(totalCount / limit));
    res.set('Access-Control-Expose-Headers', 'x-total-pages');
    res.json(investors);
  } catch (error) {
    console.error("Error fetching investors :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find user by ID
    let user = await Investor.findById(userId) || await Startup.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = { firstName, lastName, email, phone, password };

    // Hash password before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update user profile
    user = await Startup.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};