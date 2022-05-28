const jwt = require('jsonwebtoken');
const { AuthError } = require('../Errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'testKey');
  } catch (err) {
    throw new AuthError('Необходима авторизация2');
  }
  req.user = payload;
  next();
};
