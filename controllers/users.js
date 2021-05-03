const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const UnAuthorizeError = require('../errors/unAuthorizeError');
require('dotenv').config();

const { SECRET = 'devKey' } = process.env;

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { email } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError('E-mail уже используется'));
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => {
      const {
        email, name,
      } = req.body;
      const password = hash;
      return User.create({
        name, email, password,
      });
    })
    .then((user) => {
      const { _id, email } = user;
      const userData = { _id, email };
      return res.send({ data: userData });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'ReferenceError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные в метод обновления пользователя',
          ),
        );
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'AuthorizationError') {
        return next(new UnAuthorizeError('Ошибка авторизации'));
      }
      return next(err);
    });
};

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  login,
};
