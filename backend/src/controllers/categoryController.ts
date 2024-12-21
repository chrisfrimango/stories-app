import { Request, Response } from "express";
import { query } from "../utils/db";
import { CategoryResponse, ErrorResponse } from "../types/responses";
import { asyncHandler } from "../utils/asyncHandler";
import { createNotFoundError, createDatabaseError } from "../utils/errors";

export const getAllCategories = asyncHandler(
  async (
    req: Request,
    res: Response<{ categories: CategoryResponse[] } | ErrorResponse>
  ) => {
    const result = await query<CategoryResponse>({
      text: `
      SELECT *
      FROM categories c ORDER BY c.id ASC
    `,
    });

    res.json({ categories: result.rows });
  }
);

export const getCategoryById = asyncHandler(
  async (
    req: Request,
    res: Response<{ category: CategoryResponse } | ErrorResponse>
  ) => {
    const { id } = req.params;
    const result = await query<CategoryResponse>({
      text: `SELECT * FROM categories WHERE id = $1`,
      params: [id],
    });

    if (!result.rows[0]) {
      throw createNotFoundError("Category not found");
    }

    res.json({ category: result.rows[0] });
  }
);

export const createCategory = asyncHandler(
  async (
    req: Request,
    res: Response<{ category: CategoryResponse } | ErrorResponse>
  ) => {
    const { name } = req.body;

    const result = await query<CategoryResponse>({
      text: `INSERT INTO categories (name)
      VALUES ($1)
       RETURNING id, name`,
      params: [name],
    });

    if (!result.rows[0]) {
      throw createDatabaseError("Failed to create category");
    }

    res.status(201).json({ category: result.rows[0] });
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
    const { id } = req.params;

    const result = await query({
      text: `DELETE FROM categories
       WHERE id = $1
       RETURNING id`,
      params: [id],
    });

    if (!result.rows[0]) {
      throw createNotFoundError("Category not found");
    }

    res.json({ message: "Category deleted successfully" });
  }
);
