const express = require("express");

const router = express.Router();
const {
  checkContactById,
  validateCreatedContact,
  validateEditedContact,
  validateEditedStatus,
} = require("../../middlewares/contactsMiddlewares");

const {
  getController,
  getByIdController,
  createController,
  deleteController,
  editeController,
  statusController,
} = require("../../controllers/contactsControllers");


router
  .route("/")
  .get(getController)
  .post(
    validateCreatedContact,
    createController
  );

router.use("/:contactId",checkContactById);

router
  .route("/:contactId")
  .get(getByIdController)
  .delete(deleteController)
  .put(
    validateEditedContact,
    editeController
);
  

    router
      .route("/:contactId/favorite")
      .patch(
        validateEditedStatus,
        statusController
      );

    module.exports = router;

