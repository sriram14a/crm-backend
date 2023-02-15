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
  getAdmin,
} from "../controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/admin", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const isuserExist = await getAdminByName(email);

  if (isuserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }

  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  ) {
    res.status(400).send({
      message: "Password strength",
    });
    return;
  }

  const hashedPassword = await genPassword(password);
  await createAdmin(firstname, lastname, email, hashedPassword);
  res.send({ status: "ok" });
});

router.post("/admin/login",async (req, res) => {
  const { email, password } = req.body;
  const user = await getAdminByName(email);

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

  const token = jwt.sign({ id: user._id,email:user.email,firstname:user.firstname,lastname:user.lastname }, process.env.SECRET_KEY);

  res.send({ message: "Successfully login", data: token });
});

router.post("/admindata", async (req, res) => {
    const { token } = req.body;
    try {
        const user =  jwt.verify(token, process.env.SECRET_KEY);
        console.log(user)
        const email = user.email;
        const user1 = await getAdminByName(email)
          .then((data) => {
            res.send({data: data});
          })
          .catch((error) => {
            res.send({ status: "error", data: error });
          });
      } catch (error) {}
    } 
  );
/////manager
router.post("/manager", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const isuserExist = await getManagerByName(email);

  if (isuserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }

  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  ) {
    res.status(400).send({
      message: "Password strength",
    });
    return;
  }

  const hashedPassword = await genPassword(password);
  await createManager(firstname, lastname, email, hashedPassword);
  res.send({ status: "ok" });
});

router.post("/manager/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await getManagerByName(email);
  
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
  
    const token = jwt.sign({ id: user._id,email:user.email,firstname:user.firstname,lastname:user.lastname }, process.env.SECRET_KEY);
  
    res.send({ message: "Successfully login", data: token });
});

router.post("/managerdata", async (req, res) => {
    const { token } = req.body;
    try {
        const user =  jwt.verify(token, process.env.SECRET_KEY);
        console.log(user)
        const email = user.email;
        const user1 = await getManagerByName(email)
          .then((data) => {
            res.send({data: data});
          })
          .catch((error) => {
            res.send({ status: "error", data: error });
          });
      } catch (error) {}
    } 
  );

///employee
router.post("/employee", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const isuserExist = await getEmployeeByName(email);

  if (isuserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }

  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  ) {
    res.status(400).send({
      message: "Password strength",
    });
    return;
  }

  const hashedPassword = await genPassword(password);
  await createEmployee(firstname, lastname, email, hashedPassword);
  res.send({ status: "ok" });
});

router.post("/employee/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await getEmployeeByName(email);
  
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
  
    const token = jwt.sign({ id: user._id,email:user.email,firstname:user.firstname,lastname:user.lastname }, process.env.SECRET_KEY);
  
    res.send({ message: "Successfully login", data: token });
});

router.post("/employeedata", async (req, res) => {
    const { token } = req.body;
    try {
        const user =  jwt.verify(token, process.env.SECRET_KEY);
        console.log(user)
        const email = user.email;
        const user1 = await getEmployeeByName(email)
          .then((data) => {
            res.send({data: data});
          })
          .catch((error) => {
            res.send({ status: "error", data: error });
          });
      } catch (error) {}
    } 
  );

//forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await getAdminByName(email);
    if (!oldUser) {
      return res.json({ status: "User Not Exists" });
    }
    const secret = process.env.SECRET_KEY + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:8000/user/reset-password/${oldUser.email}/${token}`;
    console.log(link);
  } catch (error) {}
});

router.get("/reset-password/:email/:token", async (req, res) => {
  const { email, token } = req.params;
  console.log(req.params);
  res.send("done")
   const oldUser = await getAdminByName( req.params.email ); 
   console.log(oldUser)
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = process.env.SECRET_KEY  + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     res.send({status: "verified",email: verify.email});
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// res.send(req.params)
});
export const usersRouter = router;
