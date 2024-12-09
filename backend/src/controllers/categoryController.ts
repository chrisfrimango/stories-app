import { Request, Response } from "express";
import { query } from "../utils/db";
import { CategoryResponse, ErrorResponse } from "../types/responses";

export const getAllCategories = async (
  req: Request,
  res: Response<{ categories: CategoryResponse[] } | ErrorResponse>
): Promise<void> => {
  try {
    console.log("getAllCategories");
    const result = await query<CategoryResponse>({
      text: `
      SELECT *
      FROM categories c ORDER BY c.id ASC
    `,
    });

    res.json({ categories: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response<{ category: CategoryResponse } | ErrorResponse>
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query<CategoryResponse>({
      text: `SELECT * FROM categories WHERE id = $1`,
      params: [id],
    });

    if (!result.rows[0]) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json({ category: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response<{ category: CategoryResponse } | ErrorResponse>
): Promise<void> => {
  try {
    console.log("createCategory");
    const { name } = req.body;

    const result = await query<CategoryResponse>({
      text: `INSERT INTO categories (name)
      VALUES ($1)
       RETURNING id, name`,
      params: [name],
    });

    res.status(201).json({ category: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response<{ message: string } | ErrorResponse>
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await query({
      text: `DELETE FROM categories
       WHERE id = $1
       RETURNING id`,
      params: [id],
    });

    if (!result.rows[0]) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
