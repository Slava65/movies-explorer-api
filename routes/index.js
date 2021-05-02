const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
module.exports = router;
