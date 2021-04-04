const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidator = celebrate({
  body: {
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helper.message('Невалидный e-mail');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Zа-яА-Я0-9]'))
      .messages({
        'any.required': 'Обязательное поле',
      }),
  },
});

module.exports = loginValidator;
