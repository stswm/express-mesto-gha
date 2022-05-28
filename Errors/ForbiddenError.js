class ForbiddenError extends Error {
  constructor(message = 'Отказанно в доступе 403') {
    super(message);
    this.code = 403;
  }
}
module.exports = { ForbiddenError };
