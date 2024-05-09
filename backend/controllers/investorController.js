const express = require('express')
const router = express.Router()
const {verifyToken} = require("../middlewares/verify")
const Investor = require('../models/businessAngel')
const Startup = require('../models/startupOwner')

exports.invController = async (req,res) => {
  const startuppers = await Startup.find()
  if (!startuppers) {
    res.status(400).json({
      error: "error occured"
    })
  }
  res.status(200).json(startuppers)
}

exports.startConctroller = async (req,res) => {
  const investors = await Investor.find()
  if(!investors) {
    res.status(400).json({
      error : "error occured"
    })
  }
  res.status(200).json(investors)
}