const express = require("express")
router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token)

  if (!token) {
    return res.status(403).json({ message: 'Token bulunamadı' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Geçersiz token' });
    }
    req.user = user;
    next();
  });
};

router.get("/", authenticateToken, (req, res) => {
  res.send('Hello World')
});

module.exports = router;