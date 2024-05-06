const express = require("express")
const {check,validationResult}= require("express-validator")

checkCred = [
  check("email","please provide a valid email").isEmail(),
  check("password","invalid password").isLength({min : 6})
]
module.exports = {checkCred}