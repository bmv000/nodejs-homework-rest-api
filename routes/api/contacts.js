const express = require("express");

const router = express.Router();
const {
  checkContactById,
  validateCreatedContact,
  validateEditedContact,
} = require("../../middlewares");

const {
  getController,
  getByIdController,
  createController,
  deleteController,
  editeController,
} = require("../../controllers/contactsControllers");

router.use("/:contactId", checkContactById);

router.get("/", getController);

router.get("/:contactId", getByIdController);

router.post("/", validateCreatedContact, createController);

router.delete("/:contactId", deleteController);

router.put("/:contactId", validateEditedContact, editeController);

module.exports = router;
