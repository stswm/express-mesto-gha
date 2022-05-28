class AuthError extends Error {
  constructor(message = 'Unauthorized Error 401') {
    super(message);
    this.code = 401;
  }
}
module.exports = { AuthError };
