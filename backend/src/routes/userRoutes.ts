import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  loginController,
  registerController,
  getProfileController,
  updateProfileController,
  deleteProfileController,
} from "../controllers/userController";
const router = Router();

// Public routes
router.post("/login", loginController);
router.post("/register", registerController);

// Protected routes
router.get("/profile", authMiddleware, getProfileController);
router.get("/:id", authMiddleware, getProfileController);
router.put("/:id", authMiddleware, updateProfileController);
router.delete("/:id", authMiddleware, deleteProfileController);

export { router as userRoutes };
