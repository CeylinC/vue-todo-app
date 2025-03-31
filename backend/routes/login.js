const express = require("express");
router = express.Router();
const jwt = require('jsonwebtoken');
const db = require("../services/db");
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_key';

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Veritabanı hatası", error: err });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Geçersiz kimlik bilgileri" });
    }

    const user = result[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: "1h" });

    res.json({
      message: "Giriş başarılı",
      token: token
    });
  });
});


module.exports = router;
