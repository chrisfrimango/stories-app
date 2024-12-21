import { z } from "zod";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

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

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const loginRequestSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const registerRequestSchema = z.object({
  body: z
    .object({
      username: z
        .string()
        .min(
          USERNAME_MIN_LENGTH,
          `Username must be at least ${USERNAME_MIN_LENGTH} characters`
        )
        .max(
          USERNAME_MAX_LENGTH,
          `Username must be less than ${USERNAME_MAX_LENGTH} characters`
        )
        .trim(),
      email: z.string().email("Invalid email address").toLowerCase().trim(),
      password: z
        .string()
        .min(
          PASSWORD_MIN_LENGTH,
          `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
        )
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>["body"];
export type RegisterRequest = z.infer<typeof registerRequestSchema>["body"];

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    content: z.string().min(1, "Content is required"),
    category: z.string().transform((val) => parseInt(val, 10)),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    content: z.string().min(1, "Content is required"),
    category_id: z.string().transform((val) => parseInt(val, 10)),
  }),
  params: z.object({
    id: z.string(),
  }),
  query: z.object({}).optional(),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Category name is required")
      .max(50, "Category name is too long"),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const updateProfileSchema = z.object({
  body: z.object({
    username: usernameRules,
    email: emailRules,
    bio: z.string().max(500, "Bio is too long").optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
  query: z.object({}).optional(),
});

export const changePasswordRequestSchema = z.object({
  body: changePasswordSchema,
  query: z.object({}).optional(),
  params: z.object({
    id: z.string(),
  }),
});
