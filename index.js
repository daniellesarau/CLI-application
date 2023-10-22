const { addContacts, listContacts, getContactById, removeContact } = require("./contacts");
const { program } = require("commander");

program.option("-a, --action <type>", "choose action").option("-i, --id <type>", "user id").option("-n, --name <type>", "user name").option("-e, --email <type>", "user email").option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();
// console.log(argv);

async function invokeAction({ action, id, name, email, phone }) {
 switch (action) {
  case "list":
   const contacts = await listContacts();
   console.table(contacts);
   break;

  case "get":
   const getContact = await getContactById(id);
   console.table(getContact);
   break;

  case "add":
   const contactAdded = await addContacts(name, email, phone);
   console.log(contactAdded);
   break;

  case "remove":
   const contactRemoved = await removeContact(id);
   console.log(contactRemoved);
   break;

  default:
   console.warn("\x1B[31m Unknown action type!");
 }
}
invokeAction(argv);
