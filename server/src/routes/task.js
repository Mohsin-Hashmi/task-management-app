const express = require("express");
const taskRoutes = express.Router();
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleCompletion,
} = require("../controllers/task");

taskRoutes.get("/tasks", authMiddleware,  getAllTasks);
taskRoutes.post("/tasks", authMiddleware, createTask);
taskRoutes.put("/tasks/:_id", authMiddleware, updateTask);
taskRoutes.delete("/tasks/:_id", authMiddleware, deleteTask);
taskRoutes.put("/tasks/toggle/:_id", authMiddleware, toggleCompletion);
module.exports = taskRoutes;
