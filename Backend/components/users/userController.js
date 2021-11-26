const userService = require("./userService");

const respondError = require("../../utils/respondError");
const respondSuccess = require("../../utils/respondSuccess");

async function create(req, res) {
  try {
    const responseData = await userService.create(req.body);
    const responseObj = {};
    responseObj.message = "user created correctly";
    responseObj.data = responseData;
    return respondSuccess(res, responseObj);
  } catch (err) {
    return respondError(res, err);
  }
}

async function update(req, res) {
  try {
    const responseData = await userService.update(
      res.locals.tokenContent.id,
      req.body
    );

    const responseObj = {};
    responseObj.message = "user updated correctly";
    responseObj.data = responseData;
    return respondSuccess(res, responseObj);
  } catch (err) {
    return respondError(res, err);
  }
}

async function login(req, res) {
  try {
    const responseData = await userService.login(req.body);
    const responseObj = {};
    responseObj.message = "user logged in correctly";
    responseObj.data = responseData;
    return respondSuccess(res, responseObj);
  } catch (err) {
    return respondError(res, err);
  }
}

function logout(req, res) {
  try {
    const responseObj = {};
    responseObj.message = "Logged out";
    responseObj.data = {};
    return respondSuccess(res, responseObj);
  } catch (err) {
    return respondError(res, err);
  }
}

async function getBooksByUsername(req, res) {
  try {
    const books = await userService.getBooksByUsername(req.params.username);
    const responseObj = {};
    responseObj.message = "Retrieve user books successfuly";
    responseObj.data = books;
    return respondSuccess(res, responseObj);
  } catch (err) {
    return respondError(res, err);
  }
}

async function tokenVerification(req, res, next) {
  try {
    // Check if token is sign
    const tokenContent = await userService.tokenVerification(req);

    // Save token to local
    res.locals = { tokenContent };
    next();
  } catch (err) {
    return respondError(res, err);
  }
}

async function userAuthorization(req, res, next) {
  try {
    // Check if token is still valid
    await userService.userAuthorization(
      req.params.username,
      res.locals.tokenContent.id,
      req.header("Authorization")
    );

    next();
  } catch (err) {
    return respondError(res, err);
  }
}

module.exports = {
  create,
  update,
  login,
  logout,
  getBooksByUsername,
  tokenVerification,
  userAuthorization,
};
