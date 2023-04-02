const Joi = require("joi");

const createContactValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(5).max(30).required(),
    favorite: Joi.bool(),
  });

  return schema.validate(data);
};

const editeContactValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(30).alphanum(),
    email: Joi.string().email(),
    phone: Joi.string().min(5).max(30),
    favorite: Joi.bool(),
  });

  return schema.validate(data);
};

module.exports = {
  createContactValidator,
  editeContactValidator,
};
