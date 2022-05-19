class BadReqestError extends Error {
  constructor(message = 'Server error 400') {
    super(message);
    this.code = 400;
  }
}
module.exports = { BadReqestError };
