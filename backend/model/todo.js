const Joi = require("joi");

const todoSchema = Joi.object({
  todoTitle: Joi.string().required(),
  userId: Joi.number().integer().required()
});

module.exports = todoSchema