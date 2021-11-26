// TODO implement this
const httpStatus = require("http-status");

function internalServerError(msg) {
  return {
    message: msg,
    status: httpStatus.INTERNAL_SERVER_ERROR,
  };
}

function unprocessableEntry(msg) {
  return {
    message: msg,
    status: httpStatus.UNPROCESSABLE_ENTITY,
  };
}

function unauthorized(msg) {
  return {
    message: msg,
    status: httpStatus.UNAUTHORIZED,
  };
}

function notFound(msg) {
  return {
    message: msg,
    status: httpStatus.NOT_FOUND,
  };
}

function notImplemented(msg) {
  return {
    message: msg,
    status: httpStatus.NOT_IMPLEMENTED,
  };
}

module.exports = {
  internalServerError,
  unprocessableEntry,
  unauthorized,
  notFound,
  notImplemented,
};
