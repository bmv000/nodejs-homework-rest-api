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

router.use("/:contactId", checkContactById);

router.get("/", getController);

router.get("/:contactId", getByIdController);

router.post("/", validateCreatedContact, createController);

router.delete("/:contactId", deleteController);

router.put("/:contactId", validateEditedContact, editeController);

router.patch("/:contactId/favorite", validateEditedStatus, statusController);

module.exports = router;
