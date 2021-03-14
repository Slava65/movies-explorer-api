const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createMovieValidator = celebrate({
  body: {
    country: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Обязательное поле',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    image: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    trailer: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    movieId: Joi.number().required().messages({
      'any.required': 'Обязательное поле',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
  },
});

module.exports = createMovieValidator;
