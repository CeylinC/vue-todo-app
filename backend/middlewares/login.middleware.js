const loginSchema = require("../validators/login.validators");

const validateLogin = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.validatedData = value;
  next();
};

module.exports = validateLogin