const {
  listContacts,
  addContact,
  getById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

exports.getController = async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getByIdController = async (req, res, next) => {
  const { contact } = req.params;
  try {
    const contactById = await getById(contact);
    res.status(200).json(contactById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
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

exports.statusController = async (req, res, next) => {
  const { contact } = req.params;

  try {
    const updatedContact = await updateStatusContact(contact, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
