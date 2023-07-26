const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized (401)');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const extractBearerToken = 'Bearer ';

  if (!authorization || !authorization.startsWith(extractBearerToken)) {
    return next(new Unauthorized('Неправильные почта или пароль'));
  }

  const token = authorization.replace(extractBearerToken, '');
  let payload;

  try {
    payload = jwt.verify(token, 'supersecret-key-for-signing');
  } catch (err) {
    return next(new Unauthorized('Неправильные почта или пароль'));
  }

  req.user = payload;
  return next();
};
