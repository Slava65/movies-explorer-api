class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.status = 403;
    this.message = message;
  }
}

module.exports = ForbiddenError;
