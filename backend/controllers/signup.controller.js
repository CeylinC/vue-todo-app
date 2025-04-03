const authService = require("../services/auth.services");
const generateToken = require("../utils/auth.utils");

const signup = async (req, res) => {
  const { username, email, password } = req.validatedBody;

  try {
    const result = await authService.createUser(username, email, password);
    const userId = result.insertId;
    
    const token = generateToken(userId, username);

    res.status(201).json({
      message: "Successfull Signup!",
      userId: userId,
      username: username,
      token: token,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY" && err.message.includes("email")) {
      return res.status(400).json({
        message: "This email used",
      });
    }
    console.log(err);
    return res.status(500).json({ message: "Database Error: ", error: err });
  }
};

module.exports = signup