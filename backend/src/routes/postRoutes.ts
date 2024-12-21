import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { createPostSchema, updatePostSchema } from "../validation/schema";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, validateRequest(createPostSchema), createPost);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(updatePostSchema),
  updatePost
);
router.delete("/:id", authMiddleware, deletePost);

export { router as postRoutes };
