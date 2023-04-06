const Contact = require("./schema/contactSchema");

const listContacts = async (userId, paginationOptions) => {
  return await Contact.find(userId, "", paginationOptions).populate(
    "owner",
    "_id email subscription"
  );
};

const getById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const addContact = async (newBody) => {
  return await Contact.create(newBody);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return await Contact.findOneAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
