class ServerError extends Error {
  constructor(message = 'Server error 500') {
    super(message);
    this.code = 500;
  }
}

module.exports = { ServerError };
