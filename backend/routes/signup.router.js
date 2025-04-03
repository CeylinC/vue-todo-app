const express = require("express");
const router = express.Router();

const validateSignup = require("../middlewares/signup.middleware");
const signup = require("../controllers/signup.controller");

router.post("/", validateSignup, signup);

module.exports = router;