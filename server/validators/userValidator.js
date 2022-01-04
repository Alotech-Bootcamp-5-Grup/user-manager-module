const Joi = require("joi");

// Oluşturulmak istenen kullanıcı için gönderilen bilgilerin
// veritabanı ile uyumlu olup olmadığını kontrol eder
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

// Güncellenmek istenen kullanıcı için gönderilen bilgilerin
// veritabanı ile uyumlu olup olmadığını kontrol eder
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
