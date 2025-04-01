const express = require("express");
router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../services/db");
require("dotenv").config();
const loginSchema = require("../model/login");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key";

router.post("/", (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = value;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Veritabanı hatası", error: err });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Geçersiz kimlik bilgileri" });
    }

    const user = result[0];

    console.log(user);
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Giriş başarılı",
      userId: user.id,
      username: user.username,
      token: token,
    });
  });
});

module.exports = router;
