const Joi = require("joi");

const registerUserValidator = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
  });

  return schema.validate(data);
};

const loginUserValidator = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerUserValidator,
  loginUserValidator,
};
