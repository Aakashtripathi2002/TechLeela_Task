import express from "express";
import { createTask, getTasks, updateTaskUser,getUserTasks, adminUpdateTask, deleteTask, getTaskById } from "../controllers/taskController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", verifyToken, isAdmin, createTask);
router.get("/", verifyToken, getTasks);
router.put("/:id", verifyToken, updateTaskUser);
router.get("/user", getUserTasks);
router.get("/:id", getTaskById);
router.put("/admin/:id", adminUpdateTask);
router.delete("/:id", deleteTask);

export default router;
