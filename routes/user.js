import express from "express";
import bcrypt from "bcrypt";
import {
  genPassword,
  createAdmin,
  getAdminByName,
  createManager,
  getManagerByName,
  createEmployee,
  getEmployeeByName,
} from "../controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  const isuserExist = await getAdminByName(username);

  if (isuserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }

  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  ) {
    res
      .status(400)
      .send({
        message:
          "Password should have one CAPs letter, small letter ,special key and number,password should contain 8 characters",
      });
    return;
  }

  const hashedPassword = await genPassword(password);
  const result = await createAdmin(username, hashedPassword);
  res.send(result);
});

router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getAdminByName(username);

  if (!user) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }
  const userPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(password, userPassword);
  if (!isPasswordMatch) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.send({ message: "Successfully login", token: token });
});

/////manager
router.post("/manager", async (req, res) => {
  const { username, password } = req.body;
  const isuserExist = await getManagerByName(username);

  if (isuserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }

  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  ) {
    res
      .status(400)
      .send({
        message:
          "Password should have one CAPs letter, small letter ,special key and number,password should contain 8 characters",
      });
    return;
  }

  const hashedPassword = await genPassword(password);
  const result = await createManager(username, hashedPassword);
  res.send(result);
});

router.post("/manager/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getManagerByName(username);

  if (!user) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }
  const userPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(password, userPassword);
  if (!isPasswordMatch) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.send({ message: "Successfully login", token: token });
});

///////employee
router.post("/employee", async (req, res) => {
  const { username, password } = req.body;
  const isuserExist = await getEmployeeByName(username);

  if (isuserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }

  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  ) {
    res
      .status(400)
      .send({
        message:
          "Password should have one CAPs letter, small letter ,special key and number,password should contain 8 characters",
      });
    return;
  }

  const hashedPassword = await genPassword(password);
  const result = await createEmployee(username, hashedPassword);
  res.send(result);
});

router.post("/employee/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getEmployeeByName(username);

  if (!user) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }
  const userPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(password, userPassword);
  if (!isPasswordMatch) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.send({ message: "Successfully login", token: token });
});
export const usersRouter = router;
