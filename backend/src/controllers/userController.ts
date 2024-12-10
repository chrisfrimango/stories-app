import { Request, Response, RequestHandler } from "express";
import {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../types/requests";
import { User } from "../types/entities";
import { AuthResponse, ErrorResponse } from "../types/responses";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";
import { AuthenticatedRequest } from "../types/express";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
} from "../validation/schema";

export const loginController = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<AuthResponse | ErrorResponse>
): Promise<void> => {
  try {
    const validated = loginSchema.safeParse(req.body);
    if (!validated.success) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    console.log("Validated:", validated.success);

    const { email, password } = validated.data;
    console.log("Login attempt for email:", email);

    const result = await query<User>({
      text: "SELECT * FROM users WHERE email = $1",
      params: [email],
    });
    console.log("Database query result:", result);

    const user = result.rows[0];
    console.log("User found:", user);
    if (!user) {
      console.log("No user found with email:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", passwordMatch);

    if (!passwordMatch) {
      console.log("Password mismatch for user:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN!,
    });

    console.log("Token:", token);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: `Login failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  }
};

export const registerController = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response<AuthResponse | ErrorResponse>
): Promise<void> => {
  try {
    const validated = registerSchema.safeParse(req.body);
    console.log("🚀 ~ registerController ~ validated:", validated);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.errors);
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const { email, password, username } = validated.data;

    // Check if user already exists
    const existingUser = await query<User>({
      text: "SELECT * FROM users WHERE email = $1",
      params: [email],
    });

    if (existingUser.rows[0]) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
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
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const getProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    console.log("detta är .user.userId", userId);
    const { id } = req.params;
    console.log("detta är id", id);
    const result = await query<User>({
      text: "SELECT id, email, username, avatar, bio, created_at FROM users WHERE id = $1",
      params: [userId],
    });

    const user = result.rows[0];
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfileController = async (
  req: Request<{}, {}, UpdateProfileRequest>,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    const { username, bio, avatar } = req.body;

    const result = await query<User>({
      text: `UPDATE users
       SET username = $1, bio = $2, avatar = $3
       WHERE id = $4
       RETURNING id, email, username, avatar, bio`,
      params: [username, bio, avatar, userId],
    });

    const user = result.rows[0];
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const deleteProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    await query<User>({
      text: "DELETE FROM users WHERE id = $1",
      params: [userId],
    });
    res.status(204).send({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete profile" });
  }
};

export const changePasswordController = async (
  req: Request<{ id: string }, {}, ChangePasswordRequest>,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const validation = changePasswordSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        message: validation.error.errors[0].message,
      });
      return;
    }

    const { currentPassword, newPassword } = validation.data;

    // Get current user's password hash
    const result = await query<User>({
      text: "SELECT password FROM users WHERE id = $1",
      params: [userId],
    });

    if (!result.rows[0]) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      result.rows[0].password
    );

    if (!isCurrentPasswordValid) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await query({
      text: "UPDATE users SET password = $1 WHERE id = $2",
      params: [hashedNewPassword, userId],
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
};
