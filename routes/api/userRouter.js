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
const CheckAuth = require("../../middlewares/authMiddlewares");

router
  .route("/register")
  .post(validateUserRegistration, registerUserController);
router.route("/login").post(validateUserLogin, loginUserController);

router.route("/current").get(CheckAuth, currentUserController);

router.route("/logout").post(CheckAuth, logoutUserController);

module.exports = router;
