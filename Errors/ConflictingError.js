class ConflictingError extends Error {
  constructor(message = 'Conflicting Request 409') {
    super(message);
    this.code = 409;
  }
}
module.exports = { ConflictingError };
