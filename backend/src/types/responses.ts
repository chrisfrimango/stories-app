import { User } from "./entities";

export interface AuthResponse {
  token: string;
  user: Omit<User, "password">;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id?: number;
  created_at: Date;
  updated_at: Date;
  username: string;
  category_name?: string;
}

export interface ErrorResponse {
  message: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}
