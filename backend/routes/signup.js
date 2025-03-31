const express = require("express");
router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../services/db");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key";

router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  try {
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY" && err.message.includes("email")) {
          return res.status(400).json({
            message: "Bu e-posta adresi zaten kullanılıyor, lütfen farklı bir e-posta girin.",
          });
        }
        return res
          .status(500)
          .json({ message: "Veritabanı hatası", error: err });
      }

      const userId = result.insertId;

      const token = jwt.sign(
        { id: userId, username: username },
        JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        message: "Kullanıcı oluşturuldu!",
        userId: userId,
        token: token,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
});


module.exports = router;
