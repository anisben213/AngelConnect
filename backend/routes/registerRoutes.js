const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const {checkCred}= require("../middlewares/validation");
const {verifyToken} = require("../middlewares/verify");


router.get("/register",registerController.registerInvestorController)
router.get('/login',registerController.login)
router.post("/register/investor",checkCred,registerController.registerInvestorController);
router.post('register/startup',checkCred,registerController.registerStartupController)
router.post("/login", registerController.login);

module.exports = router;
