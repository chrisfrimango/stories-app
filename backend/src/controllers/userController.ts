import { Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "../types/requests";
import { User } from "../types/entities";
import { AuthResponse, ErrorResponse } from "../types/responses";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";
import { AuthenticatedRequest } from "../types/express";
import { asyncHandler } from "../utils/asyncHandler";
import { createAuthError, createNotFoundError } from "../utils/errors";

export const loginController = asyncHandler(
  async (
    req: Request<{}, {}, LoginRequest>,
    res: Response<AuthResponse | ErrorResponse>
  ) => {
    const { email, password } = req.body;

    const result = await query<User>({
      text: "SELECT * FROM users WHERE email = $1",
      params: [email],
    });

    const user = result.rows[0];
    if (!user) {
      throw createAuthError("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createAuthError("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  }
);

export const registerController = asyncHandler(
  async (
    req: Request<{}, {}, RegisterRequest>,
    res: Response<AuthResponse | ErrorResponse>
  ) => {
    const { email, password, username } = req.body;

    const existingUser = await query<User>({
      text: "SELECT * FROM users WHERE email = $1",
      params: [email],
    });

    if (existingUser.rows[0]) {
      throw createAuthError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query<User>({
      text: `INSERT INTO users (email, password, username)
       VALUES ($1, $2, $3)
       RETURNING id, email, username`,
      params: [email, hashedPassword, username],
    });

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.EXPIRES_IN!,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    });
  }
);

export const getProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.userId;
    const result = await query<User>({
      text: "SELECT id, email, username, avatar, bio, created_at FROM users WHERE id = $1",
      params: [userId],
    });

    const user = result.rows[0];
    if (!user) {
      throw createNotFoundError("User not found");
    }

    res.json(user);
  }
);

export const updateProfileController = asyncHandler(
  async (req: Request, res: Response<{ user: User } | ErrorResponse>) => {
    const userId = (req as AuthenticatedRequest).user.userId;
    const { username, email, bio } = req.body;

    const result = await query<User>({
      text: `UPDATE users
       SET username = $1, email = $2, bio = $3
       WHERE id = $4
       RETURNING id, email, username, bio`,
      params: [username, email, bio, userId],
    });

    const user = result.rows[0];
    if (!user) {
      throw createNotFoundError("User not found");
    }

    res.json({ user });
  }
);

export const deleteProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.userId;
    await query<User>({
      text: "DELETE FROM users WHERE id = $1",
      params: [userId],
    });
    res.status(204).send({ message: "Profile deleted successfully" });
  }
);

export const changePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.userId;
    const { currentPassword, newPassword } = req.body;

    const result = await query<User>({
      text: "SELECT password FROM users WHERE id = $1",
      params: [userId],
    });

    if (!result.rows[0]) {
      throw createNotFoundError("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      result.rows[0].password
    );

    if (!isCurrentPasswordValid) {
      throw createAuthError("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await query({
      text: "UPDATE users SET password = $1 WHERE id = $2",
      params: [hashedNewPassword, userId],
    });

    res.json({ message: "Password updated successfully" });
  }
);
