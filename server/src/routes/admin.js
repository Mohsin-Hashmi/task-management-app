const express = require("express");
const adminRoutes = express.Router();
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");
const { getAllUsers, getUserTasks, platformStats } = require("../controllers/admin");
adminRoutes.get("/admin/users", authMiddleware, adminMiddleware, getAllUsers);
adminRoutes.get(
  "/admin/users/:_id/tasks",
  authMiddleware,
  adminMiddleware,
  getUserTasks
);
adminRoutes.get(
  "/admin/stats",
  authMiddleware,
  adminMiddleware,
  platformStats
);
module.exports = adminRoutes;
