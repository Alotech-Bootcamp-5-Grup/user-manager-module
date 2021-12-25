const Joi = require("joi");

exports.createUserValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).required(),
    user_name: Joi.string().min(2).required(),
    user_surname: Joi.string().min(2).required(),
    user_password: Joi.string().min(8).required(),
    user_email: Joi.string().email().required(),
    user_type: Joi.string().valid('USER', 'ADMIN').default('USER'),
  });
  return schema.validate(data);
};

exports.updateUserValidator = (data) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    username: Joi.string().min(2).required(),
    user_name: Joi.string().min(2).required(),
    user_surname: Joi.string().min(2).required(),
    user_password: Joi.string().min(8).required(),
    user_email: Joi.string().email().required(),
    user_type: Joi.string().valid('USER', 'ADMIN').default('USER'),
  });
  return schema.validate(data);
};
