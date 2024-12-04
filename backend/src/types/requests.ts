export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  category_id?: number;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  category_id?: number;
}

export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  avatar?: string;
}
