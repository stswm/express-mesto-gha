const { NotFoundErr } = require('../Errors/NotFoundErr');

const badUrl = (_req, _res, next) => {
  next(new NotFoundErr('Page not found'));
};
const errorHeandler = (err, req, res, next) => {
  if (err.kind === 'ObjectId') {
    res.status(400).send({
      message: 'Переданы неверные данные',
    });
  }
  res.status(err.code).send({
    message: err.code === 500
      ? 'server error'
      : err.message,
  });
  next();
};

module.exports = {
  badUrl,
  errorHeandler,
};
