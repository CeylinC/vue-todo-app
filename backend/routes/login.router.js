const express = require("express");
const router = express.Router();

const validateLogin = require("../middlewares/login.middleware");
const login = require("../controllers/login.controller");

router.post("/", validateLogin, login);

module.exports = router;