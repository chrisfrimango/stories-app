import { Request, Response } from "express";
import {
  LoginRequest,
  RegisterRequest,
} from "../types/requests";
import { User } from "../types/entities";
import { AuthResponse, ErrorResponse } from "../types/responses";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";
import { AuthenticatedRequest } from "../types/express";
import { loginSchema, registerSchema } from "../validation/schema";

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

    const existingUser = await query<User>({
      text: "SELECT * FROM users WHERE email = $1",
      params: [email],
    });

    if (existingUser.rows[0]) {
      res.status(400).json({ message: "Email already registered" });
      return;
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
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};
