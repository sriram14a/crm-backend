import express from "express";
import {
  getUser,
  getUserByID,
  deleteByID,
  AddUser,
  EditUser,
} from "../controller.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await getUser(req);
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  user ? res.send(user) : res.status(404).send({ message: "No user found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await deleteByID(id);
  user ? res.send(user) : res.status(404).send({ message: "No user found" });
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    await AddUser(newUser);
    res.status(200).json({ message: "successfully inserted", data: newUser });
  } catch {
    res.status(404).json({ message: "failed to insert" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    await EditUser(id, updatedUser);
    res
      .status(200)
      .json({ message: "successfully updated", data: updatedUser });
  } catch {
    res.status(404).json({ message: "failed to update" });
  }
});

export const adduserRouter = router;
