const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  const YOUR_JWT = token; // вставьте сюда JWT, который вернул публичный сервер
  const SECRET_KEY_DEV = 'SECRET'; // вставьте сюда секретный ключ для разработки из кода

  try {
    payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    req.user = payload;

    console.log(
      '\x1b[31m%s\x1b[0m',
      `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `
    );
  } catch (err) {
    if (
      err.name === 'JsonWebTokenError' &&
      err.message === 'invalid signature'
    ) {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются'
      );
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
    }
  }
  req.user = payload;

  next();
};
module.exports = auth;
