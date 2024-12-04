import { z } from "zod";

// Lägg till konstanter för magiska nummer
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

// Lägg till felmeddelanden som konstanter
const ERROR_MESSAGES = {
  USERNAME_MIN: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
  USERNAME_MAX: `Username must be less than ${USERNAME_MAX_LENGTH} characters`,
  PASSWORD_MIN: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter",
  PASSWORD_LOWERCASE: "Password must contain at least one lowercase letter",
  PASSWORD_NUMBER: "Password must contain at least one number",
  PASSWORDS_MATCH: "Passwords don't match",
  INVALID_EMAIL: "Invalid email address",
} as const;

// Använd konstanterna i dina scheman
const passwordRules = z
  .string()
  .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_MIN)
  .regex(/[A-Z]/, ERROR_MESSAGES.PASSWORD_UPPERCASE)
  .regex(/[a-z]/, ERROR_MESSAGES.PASSWORD_LOWERCASE)
  .regex(/[0-9]/, ERROR_MESSAGES.PASSWORD_NUMBER);

const emailRules = z
  .string()
  .email("Invalid email address")
  .toLowerCase()
  .trim();

const usernameRules = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be less than 20 characters")
  .trim();

// Uppdaterade scheman
export const userSchema = z.object({
  username: usernameRules,
  email: emailRules,
  password: passwordRules,
});

export const loginSchema = z.object({
  email: emailRules,
  password: z.string(),
});

export const registerSchema = z
  .object({
    username: usernameRules,
    email: emailRules,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
