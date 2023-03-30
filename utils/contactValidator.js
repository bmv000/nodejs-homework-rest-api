const Joi = require("joi");

const createContactValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
  });

  return schema.validate(data);
};

const editeContactValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.bool(),
  });

  return schema.validate(data);
};

module.exports = {
  createContactValidator,
  editeContactValidator,
};
