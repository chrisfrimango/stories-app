import { Request, Response } from "express";
import { query } from "../utils/db";
import { AuthenticatedRequest } from "../types/express";
import { PostResponse, ErrorResponse } from "../types/responses";
import { asyncHandler } from "../utils/asyncHandler";
import { createNotFoundError, createDatabaseError } from "../utils/errors";

export const getAllPosts = asyncHandler(
  async (
    req: Request,
    res: Response<{ posts: PostResponse[] } | ErrorResponse>
  ) => {
    const result = await query<PostResponse>({
      text: `
      SELECT p.*, u.username, c.name as category_name
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `,
    });

    res.json({ posts: result.rows });
  }
);

export const getPostById = asyncHandler(
  async (req: Request, res: Response<PostResponse | ErrorResponse>) => {
    const { id } = req.params;
    const result = await query<PostResponse>({
      text: `SELECT p.*, u.username, c.name as category_name
     FROM posts p
     LEFT JOIN users u ON p.user_id = u.id
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = $1`,
      params: [id],
    });

    if (!result.rows[0]) {
      throw createNotFoundError("Post not found");
    }

    res.json(result.rows[0]);
  }
);

export const createPost = asyncHandler(
  async (
    req: Request,
    res: Response<{ post: PostResponse } | ErrorResponse>
  ) => {
    console.log("Received post data:", req.body);
    const { title, content, category } = req.body;
    const userId = (req as AuthenticatedRequest).user.userId;
    const categoryId = parseInt(category, 10);

    const result = await query<PostResponse>({
      text: `INSERT INTO posts (title, content, user_id, category_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, content, user_id, category_id, created_at`,
      params: [title, content, userId, categoryId],
    });

    if (!result.rows[0]) {
      throw createDatabaseError("Failed to create post");
    }

    res.status(201).json({ post: result.rows[0] });
  }
);

export const updatePost = asyncHandler(
  async (
    req: Request,
    res: Response<{ post: PostResponse } | ErrorResponse>
  ) => {
    const { id } = req.params;
    const { title, content, category_id } = req.body;
    const userId = (req as AuthenticatedRequest).user.userId;

    console.log("Update post data:", {
      title,
      content,
      category_id,
      id,
      userId,
    });

    const result = await query<PostResponse>({
      text: `UPDATE posts
     SET title = $1, content = $2, category_id = $3, updated_at = CURRENT_TIMESTAMP
     WHERE id = $4 AND user_id = $5
     RETURNING id, title, content, user_id, category_id, updated_at,
       (SELECT username FROM users WHERE id = user_id) as username,
       (SELECT name FROM categories WHERE id = category_id) as category_name`,
      params: [title, content, category_id, id, userId],
    });

    if (!result.rows[0]) {
      throw createNotFoundError("Post not found or unauthorized");
    }

    res.json({ post: result.rows[0] });
  }
);

export const deletePost = asyncHandler(
  async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
    const { id } = req.params;
    const userId = (req as AuthenticatedRequest).user.userId;

    const result = await query({
      text: `DELETE FROM posts
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
      params: [id, userId],
    });

    if (!result.rows[0]) {
      throw createNotFoundError("Post not found or unauthorized");
    }

    res.json({ message: "Post deleted successfully" });
  }
);
