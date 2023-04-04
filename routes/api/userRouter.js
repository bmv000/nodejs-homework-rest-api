const express = require("express");

const router = express.Router();

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
} = require("../../controllers/usersControllers");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../../middlewares/usersMiddlewares");
const checkAuth = require("../../middlewares/authMiddlewares");

router
  .route("/register")
  .post(validateUserRegistration, registerUserController);
router.route("/login").post(validateUserLogin, loginUserController);

router.route("/current").get(checkAuth, currentUserController);

router.route("/logout").post(checkAuth, logoutUserController);

module.exports = router;
