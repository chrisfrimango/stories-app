import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { createCategorySchema } from "../validation/schema";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post(
  "/",
  authMiddleware,
  validateRequest(createCategorySchema),
  createCategory
);
router.delete("/:id", authMiddleware, deleteCategory);

export { router as categoryRoutes };
