import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((dat) => dat.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((dat) => dat.id === contactId);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}
