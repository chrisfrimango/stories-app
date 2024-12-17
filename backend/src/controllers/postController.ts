import { Request, Response } from "express";
import { query } from "../utils/db";
import { AuthenticatedRequest } from "../types/express";
import { PostResponse, ErrorResponse } from "../types/responses";

export const getAllPosts = async (
  req: Request,
  res: Response<{ posts: PostResponse[] } | ErrorResponse>
): Promise<void> => {
  try {
    console.log("getAllPosts");
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
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostById = async (
  req: Request,
  res: Response<PostResponse | ErrorResponse>
): Promise<void> => {
  try {
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
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

export const createPost = async (
  req: Request,
  res: Response<{ post: PostResponse } | ErrorResponse>
): Promise<void> => {
  try {
    const { title, content, category } = req.body;
    const userId = (req as AuthenticatedRequest).user.userId;

    const result = await query<PostResponse>({
      text: `INSERT INTO posts (title, content, user_id, category_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, content, user_id, category_id, created_at`,
      params: [title, content, userId, category],
    });

    res.status(201).json({ post: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (
  req: Request,
  res: Response<{ post: PostResponse } | ErrorResponse>
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, category_id } = req.body;
    const userId = (req as AuthenticatedRequest).user.userId;

    const result = await query<PostResponse>({
      text: `UPDATE posts
       SET title = $1, content = $2, category_id = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 AND user_id = $5
       RETURNING id, title, content, user_id, category_id, updated_at`,
      params: [title, content, category_id, id, userId],
    });

    if (!result.rows[0]) {
      res.status(404).json({ message: "Post not found or unauthorized" });
      return;
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (
  req: Request,
  res: Response<{ message: string } | ErrorResponse>
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as AuthenticatedRequest).user.userId;

    const result = await query({
      text: `DELETE FROM posts
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      params: [id, userId],
    });

    if (!result.rows[0]) {
      res.status(404).json({ message: "Post not found or unauthorized" });
      return;
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};
