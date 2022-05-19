const {
  // ServerError,
  NotFoundErr,
  // BadReqestError,
} = require('./Errors');

const badUrl = (req, res, next) => {
  next(new NotFoundErr('Page not found'));
};

module.exports = {
  badUrl,
};
