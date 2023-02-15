import express from "express";
import {
  getLead,
  getLeadByID,
  deleteLeadByID,
  AddLead,
  EditLead,
} from "../controller.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const lead = await getLead(req);
  res.send(lead);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const lead = await getLeadByID(id);
  lead ? res.send(lead) : res.status(404).send({ message: "No user found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const lead = await deleteLeadByID(id);
  lead ? res.send(lead) : res.status(404).send({ message: "No user found" });
});

router.post("/", async (req, res) => {
  try {
    const newLead = req.body;
    await AddLead(newLead);
    res.status(200).json({ message: "successfully inserted", data: newLead });
  } catch {
    res.status(404).json({ message: "failed to insert" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedLead = req.body;
  try {
    await EditLead(id, updatedLead);
    res
      .status(200)
      .json({ message: "successfully updated", data: updatedLead });
  } catch {
    res.status(404).json({ message: "failed to update" });
  }
});

export const addLeadRouter = router;
