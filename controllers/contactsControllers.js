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

exports.createController = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await getById(contactId);
    res.status(200).json(contactById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteController = async (req, res, next) => {
  const { contactId } = req.params;
   try {
     await removeContact(contactId);

     res.status(200).json({ message: "contact deleted" });
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error" });
   }
};

exports.editeController = async (req, res, next) => {
  const { contactId } = req.params;
 try {
   const updatedContact = await updateContact(contactId, req.body);
   res.status(200).json(updatedContact);
 } catch (error) {
   console.log(error);
   res.status(500).json({ message: "Server error" });
 }
};

exports.statusController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await updateStatusContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
