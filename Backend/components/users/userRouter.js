const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.post("/create", userController.create);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// Only check if token is signed
router.use(userController.tokenVerification);
// Use with params
router.use(`/:path/:username`, userController.userAuthorization);
router.get(`/books/:username`, userController.getBooksByUsername);
router.put(`/settings/:username`, userController.update);

module.exports = router;
