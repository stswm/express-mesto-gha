const { NotFoundErr } = require('../Errors/NotFoundErr');

const badUrl = (_req, _res, next) => {
  next(new NotFoundErr('Page not found'));
};
const errorHeandler = (err, req, res, next) => {
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
