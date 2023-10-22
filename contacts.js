const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "db", "contacts.json");
console.log(contactPath);

// list Contact
async function listContacts() {
 try {
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
 } catch (err) {
  console.error("Error!!! Try again", err);
  return;
 }
}

// add contact
async function addContacts(name, phone, email) {
 if (!name || !email || !phone) {
  console.error("Add name, email and phone!!");
  return;
 }
 try {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, phone, email };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  console.log("Contact was added!");
 } catch (error) {
  console.error("Error!!!", error);
 }
}

// find contact by ID
async function getContactById(contactId) {
 try {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
 } catch (error) {
  console.error(error);
  return;
 }
}

// delete contact
async function removeContact(contactId) {
 try {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

  if (updatedContacts.length === contacts.length) return null;

  await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));

  return contacts.find((contact) => contact.id === contactId);
 } catch (error) {
  console.error("Error!!!", error);
 }
}

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContacts,
};
