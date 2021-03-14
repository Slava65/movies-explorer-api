const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
