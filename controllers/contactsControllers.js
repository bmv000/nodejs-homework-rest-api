const {
  listContacts,
  addContact,
  getById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contactsModels");

exports.getController = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const paginationOptions = { skip, limit: Number(limit) };
  try {
    const contactsList = await listContacts({owner: _id}, paginationOptions);
    res.status(200).json(contactsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createController = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const newContact = await addContact({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const contactById = await getById({ _id: contactId, owner: _id });
    res.status(200).json(contactById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteController = async (req, res, next) => {
  const { contactId } = req.params;
   const { _id } = req.user;
   try {
     const deletedContact = await removeContact({ _id: contactId, owner: _id });
     if (!deletedContact) {
       return res.status(404).json({
         message: "contact not found",
       });
     }
     res.status(200).json({ message: "contact deleted" });
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error" });
   }
};

exports.editeController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
 try {
   const updatedContact = await updateContact(
     { _id: contactId, owner: _id },
     req.body
   );
   if (!updatedContact) {
     return res.status(404).json({
       message: "contact not found",
     });
   }
   res.status(200).json(updatedContact);
 } catch (error) {
   console.log(error);
   res.status(500).json({ message: "Server error" });
 }
};

exports.statusController = async (req, res, next) => {
 const { contactId } = req.params;
const { _id } = req.user;
 try {
   const updatedContact = await updateStatusContact(
     { _id: contactId, owner: _id },
     req.body
   );

   if (!updatedContact) {
     return res.status(404).json({
       message: "contact not found",
     });
   }

   res.status(200).json(updatedContact);
 } catch (error) {
   console.log(error);
   res.status(500).json({ message: "Server error" });
 }
};
