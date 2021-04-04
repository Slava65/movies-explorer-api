const userRouter = require('express').Router();

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', updateUser);

module.exports = userRouter;
