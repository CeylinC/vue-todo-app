const express = require("express");
router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const usersFilePath = path.join(__dirname, '../users.json');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_key';

const getUsers = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  console.log(users)
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // JWT token oluştur
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

  // Başarılı login, token döndürülür
  res.json({
    message: 'Login successful',
    token: token
  });
});

module.exports = router;
