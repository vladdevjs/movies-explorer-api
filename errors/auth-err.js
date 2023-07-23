const httpConstants = require('http2').constants;

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = AuthError;
