const { celebrate, Joi } = require('celebrate');

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    postId: Joi.string().alphanum().length(24).messages({
      'any.required': 'Невалидный id',
    }),
  }).unknown(true),
});

module.exports = deleteMovieValidator;
