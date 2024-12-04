import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { loginController } from "../controllers/userController";
const router = Router();

// Public routes
router.post("/login", loginController);

// Protected routes

export { router as userRoutes };
