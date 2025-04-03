const signupSchema = require("../validators/signup.validators");

const validateSignup = (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.validatedBody = value;
  next();
};

module.exports = validateSignup;