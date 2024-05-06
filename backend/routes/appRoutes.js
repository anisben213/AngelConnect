const express = require("express");
const router = express.Router();

const {registerStartupController,registerInvestorController} = require("../controllers/registerController")

router.get("/");

router.post("/register");

router.get("/register",registerInvestorController)

router.post("/login");

router.get("/investor/:id");

router.get("investor/:id/startups");

router.get("/startup/:id");

router.get("/startup/:id/findInvestor");
