const { NotFoundErr } = require('../Errors/NotFoundErr');

const badUrl = (req, res, next) => {
  next(new NotFoundErr('Page not found'));
};
const errorHeandler = (err, req, res, next) => {
  console.log(`Error code ${err.code}: ${err.message}`);
  res.status(err.code).send({ message: err.message });
  next();
};

module.exports = {
  badUrl,
  errorHeandler,
};
