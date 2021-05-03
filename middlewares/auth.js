const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET = 'devKey' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация1' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация2' });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
