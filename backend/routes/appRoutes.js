const express = require("express");
const router = express.Router();
const userController = require("../controllers/appController");
const { verifyToken } = require("../middlewares/verify");
const { checkCred } = require("../middlewares/validation");

router.get("/");

router.get("investor/:id/startups", verifyToken, userController.getInvestors);

router.get("startup/:id/investors", verifyToken, userController.getStartuppers);

router.get("user/:userId", verifyToken, userController.getUserDetails);

router.get("user/profile/:userId", verifyToken, userController.updateProfile);

router.post("user/profile/:userId",checkCred, verifyToken, userController.updateProfile);

module.exports = router;
