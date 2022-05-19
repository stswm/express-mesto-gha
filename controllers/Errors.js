/* eslint-disable max-classes-per-file */
class ServerError extends Error {
  constructor(message = 'Server error 500') {
    super(message);
    this.code = 500;
  }
}
class BadReqestError extends Error {
  constructor(message = 'Server error 400') {
    super(message);
    this.code = 400;
  }
}
class NotFoundErr extends Error {
  constructor(message = 'Object not found 404') {
    super(message);
    this.code = 404;
  }
}
module.exports = { ServerError, BadReqestError, NotFoundErr };
