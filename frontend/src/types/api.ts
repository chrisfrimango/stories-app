// frontend/src/types/api.ts

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id?: number;
  created_at: string;
  updated_at?: string;
  username: string;
  category_name?: string;
}
