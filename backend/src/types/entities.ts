import { QueryResultRow } from "pg";

export interface User extends QueryResultRow {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  created_at: Date;
}

export interface Post extends QueryResultRow {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category extends QueryResultRow {
  id: number;
  name: string;
}
