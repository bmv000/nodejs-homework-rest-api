const express = require("express");

const router = express.Router();

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  updateAvatarController,
  verifyEmailController,
  resendingEmailController,
} = require("../../controllers/usersControllers");
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserConfirmation,
} = require("../../middlewares/usersMiddlewares");
const checkAuth = require("../../middlewares/authMiddlewares");
const { upload } = require("../../middlewares/upload");


router
  .route("/register")
  .post(validateUserRegistration, registerUserController);

  router
    .route("/verify/:verificationToken")
    .get(verifyEmailController);

  router
    .route("/verify")
    .post(
      validateUserConfirmation,
      resendingEmailController
    );
router.route("/login").post(validateUserLogin, loginUserController);

router.route("/current").get(checkAuth, currentUserController);

router.route("/logout").post(checkAuth, logoutUserController);

router
  .route("/avatars")
  .patch(checkAuth, upload.single("avatar"), updateAvatarController);

module.exports = router;
