const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listOfContacts = JSON.parse(data);

    return listOfContacts;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

const getById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactById = JSON.parse(data).find(
      (contact) => contact.id === contactId
    );

    return contactById;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactById = JSON.parse(data).find(
      (contact) => contact.id === contactId
    );

    const newContactsList = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf8");

    return contactById;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);

    const { name, email, phone } = body;
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };

    listContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listContacts), "utf8");

    return newContact;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);

    const { name, email, phone } = body;

    listContacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;

        return contact;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(listContacts), "utf8");

    const newData = await fs.readFile(contactsPath, "utf8");
    const contactById = JSON.parse(newData).find(
      (contact) => contact.id === contactId
    );

    return contactById;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
