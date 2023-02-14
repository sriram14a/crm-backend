import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function getAdminByName(username) {
    return await client
      .db("crm")
      .collection("admin")
      .findOne({ username: username });
  }

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function createAdmin(username, hashedPassword) {
  return await client
    .db("crm")
    .collection("admin")
    .insertOne({ username: username, password: hashedPassword });
}

//for manager
export async function getManagerByName(username) {
    return await client
      .db("crm")
      .collection("manager")
      .findOne({ username: username });
  }
  export async function createManager(username, hashedPassword) {
    return await client
      .db("crm")
      .collection("manager")
      .insertOne({ username: username, password: hashedPassword });
  }

  //for employee
  export async function getEmployeeByName(username) {
    return await client
      .db("crm")
      .collection("employee")
      .findOne({ username: username });
  }
  export async function createEmployee(username, hashedPassword) {
    return await client
      .db("crm")
      .collection("employee")
      .insertOne({ username: username, password: hashedPassword });
  }


