import { client } from "./index.js";
import bcrypt from "bcrypt";


//password
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

//admin
export async function getAdminByName(email) {
  return await client.db("crm").collection("admin").findOne({ email: email });
}

export async function getAdmin(id) {
  console.log(id);
  return await client.db("crm").collection("admin").findOne({ _id: id });
}

export async function createAdmin(firstname, lastname, email, hashedPassword) {
  return await client.db("crm").collection("admin").insertOne({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });
}

export async function Editadmin(id, encryptedPassword) {
  return await client
    .db("crm")
    .collection("user")
    .updateOne(
      { _id: id },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
}

//for manager
export async function getManagerByName(email) {
  return await client.db("crm").collection("manager").findOne({ email: email });
}
export async function createManager(
  firstname,
  lastname,
  email,
  hashedPassword
) {
  return await client.db("crm").collection("manager").insertOne({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });
}

//for employee
export async function getEmployeeByName(email) {
  return await client
    .db("crm")
    .collection("employee")
    .findOne({ email: email });
}
export async function createEmployee(
  firstname,
  lastname,
  email,
  hashedPassword
) {
  return await client.db("crm").collection("employee").insertOne({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });
}

///adding employee
export async function getUser(req) {
  return await client.db("crm").collection("user").find(req.query).toArray();
}

export async function getUserByID(id) {
  return await client.db("crm").collection("user").findOne({ id: id });
}

export async function deleteByID(id) {
  return await client.db("crm").collection("user").deleteOne({ id: id });
}

export async function AddUser(newUser) {
  return await client.db("crm").collection("user").insertOne(newUser);
}

export async function EditUser(id, updatedUser) {
  return await client
    .db("crm")
    .collection("user")
    .updateOne({ id: id }, { $set: updatedUser });
}

///lead controll

export async function getLead(req) {
  return await client.db("crm").collection("lead").find(req.query).toArray();
}

export async function getLeadByID(id) {
  return await client.db("crm").collection("lead").findOne({ id: id });
}

export async function deleteLeadByID(id) {
  return await client.db("crm").collection("lead").deleteOne({ id: id });
}

export async function AddLead(newLead) {
  return await client.db("crm").collection("lead").insertOne(newLead);
}

export async function EditLead(id, updatedLead) {
  return await client
    .db("crm")
    .collection("lead")
    .updateOne({ id: id }, { $set: updatedLead });
}
