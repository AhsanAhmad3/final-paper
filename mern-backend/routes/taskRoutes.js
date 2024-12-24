const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  const { name, description, dueDate } = req.body;
  try {
    const newTask = new Task({ name, description, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err });
  }
});

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting task", error: err });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err });
  }
});

module.exports = router;
