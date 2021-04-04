const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnAuthorizeError = require('../errors/unAuthorizeError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'e-mail введен неверно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        const regex = /[a-z0-9]+/i;
        return regex.test(v);
      },
      message: 'пароль содержит недопустимые символы',
    },
  },
  name: {
    type: String,
    required: true,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[а-яa-z]{2,30}$/i;
        return regex.test(v);
      },
      message: 'Имя введено неверно',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnAuthorizeError('Неправильные почта или пароль'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnAuthorizeError('Неправильные почта или пароль'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
