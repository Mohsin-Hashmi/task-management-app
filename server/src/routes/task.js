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
module.exports = taskRoutes;
