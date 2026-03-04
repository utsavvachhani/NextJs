import express from "express";
import {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  updateStatus,
  getTodoStats,
} from "../controllers/todo.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkTodoOwnership } from "../middleware/owner.middleware.js";

const router = express.Router();

/* ===============================
   PROTECTED TODO ROUTES
================================= */

// Create Todo
router.post("/", authMiddleware, createTodo);

// Get All Todos (Pagination + Filters)
router.get("/", authMiddleware, getTodos);

// Get Dashboard Stats
router.get("/stats", authMiddleware, getTodoStats);

// Get Single Todo
router.get("/:id", authMiddleware, checkTodoOwnership, getSingleTodo);

// Update Todo
router.put("/:id", authMiddleware, checkTodoOwnership, updateTodo);

// Soft Delete (Move to Trash)
router.delete("/:id", authMiddleware, checkTodoOwnership, deleteTodo);

// Update Status (Pending / Completed / Skipped)
router.patch("/:id/status", authMiddleware, checkTodoOwnership, updateStatus);

export default router;