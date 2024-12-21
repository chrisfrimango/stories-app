import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import {
  loginController,
  registerController,
  getProfileController,
  updateProfileController,
  deleteProfileController,
  changePasswordController,
} from "../controllers/userController";
import {
  loginRequestSchema,
  registerRequestSchema,
  changePasswordSchema,
  changePasswordRequestSchema,
  updateProfileSchema,
} from "../validation/schema";

const router = Router();

// Public routes with validation
router.post("/login", validateRequest(loginRequestSchema), loginController);
router.post(
  "/register",
  validateRequest(registerRequestSchema),
  registerController
);

// Protected routes
router.get("/profile", authMiddleware, getProfileController);
router.get("/:id", authMiddleware, getProfileController);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(updateProfileSchema),
  updateProfileController
);
router.delete("/:id", authMiddleware, deleteProfileController);
router.put(
  "/:id/change-password",
  authMiddleware,
  validateRequest(changePasswordRequestSchema),
  changePasswordController
);

export { router as userRoutes };
