const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// READ all
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// CREATE
router.post("/", async (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ message: "Title required" });
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
});

// UPDATE (toggle complete)
router.put("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
