const customError = require("./customError");
const respondError = require("./respondError");

function jsonParseError(err, req, res, next) {
  if (err.type === "entity.parse.failed")
    return errorHandler("parse-error", res);
  if (err) return errorHandler("", res);
  next();
}

function genericError(req, res) {
  const error = customError.notFound(`Not a valid URL`);
  return respondError(res, error);
}
module.exports = { jsonParseError, genericError };
