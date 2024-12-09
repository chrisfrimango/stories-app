import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
} from "../controllers/categoryController";

const router = Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected routes
router.post("/", authMiddleware, createCategory);

export { router as categoryRoutes };
