const express = require("express");
const router = express.Router();
const userController = require("../controllers/appController");
const { auth } = require("../middlewares/verify");
const { checkCred } = require("../middlewares/validation");

 // get route to get the investors table
router.get("/startupper/dashboard",auth, userController.getInvestors);
//  get route to get the startuppers table
router.get("/investor/dashboard", auth, userController.getStartuppers);

// put route to update profile informations
router.put("/profile/:userId", userController.updateProfile);

module.exports = router;
