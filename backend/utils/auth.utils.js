const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key";

const generateToken = (userId, username) => {
  return jwt.sign(
    { id: userId, username: username },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = generateToken