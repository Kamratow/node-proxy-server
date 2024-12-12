class Exception extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    // We use this class only to create errors that we predict might occur when app is running
    // for example bad request from the API client - those error will be called operational
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Exception;
