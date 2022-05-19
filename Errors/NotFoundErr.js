class NotFoundErr extends Error {
  constructor(message = 'Object not found 404') {
    super(message);
    this.code = 404;
  }
}
module.exports = { NotFoundErr };
