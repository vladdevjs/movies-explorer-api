const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new AuthError('Необходима авторизация!'));
  }
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthError('Необходима авторизация!'));
  }
  req.user = payload;
  return next();
};
