const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

exports.getController = async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json(contactsList);
};

exports.getByIdController = async (req, res, next) => {
  const { contact } = req;

  res.status(200).json(contact);
};

exports.deleteController = async (req, res, next) => {
  const { contact } = req;
  await removeContact(contact.id);

  res.status(200).json({ message: "contact deleted" });
};

exports.createController = async (req, res, next) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
};

exports.editeController = async (req, res, next) => {
  const { contact } = req;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const updatedContact = await updateContact(contact.id, req.body);

  res.status(200).json(updatedContact);
};
