const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const { checkCred } = require("../middlewares/validation");

router.post("/register",checkCred,registerController.registerInvestorController);
router.post("/login", checkCred, registerController.loginInvestor);

module.exports = router;
