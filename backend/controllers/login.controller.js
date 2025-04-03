const authService = require("../services/auth.services");
const generateToken = require("../utils/auth.utils");

const login = async (req, res) => {
  const { email, password } = req.validatedData;

  try {
    const user = await authService.controlUser(email, password);
    const token = generateToken(user.id, user.username);

    res.status(201).json({
      message: "Succesfull Login",
      userId: user.id,
      username: user.username,
      token: token,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
};

module.exports = login