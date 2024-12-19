import { Post } from "./api";
// import { UserProfile } from "./userTypes";

export interface PostCardProps {
  post: Post;
  isFeatured?: boolean;
  heightOverride?: number;
}

export interface PostsResponse {
  posts: Post[];
}

export interface PostResponse {
  post: Post;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface UseHandlePostDeleteOptions {
  postId: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type { Post };
