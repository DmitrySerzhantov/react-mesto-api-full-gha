const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;
  const YOUR_JWT = req.cookies.jwt;

  try {
    payload = jwt.verify(
      YOUR_JWT,
      NODE_ENV === 'production' ? JWT_SECRET : 'SECRET',
    );
  } catch (err) {
    next(new Unauthorized('Пользователь не авторизован'));
    return;
  }
  req.user = payload;

  next();
};
module.exports = auth;
