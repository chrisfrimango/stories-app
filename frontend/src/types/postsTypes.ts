import { Post } from "./api";
import { UserProfile } from "./userTypes";

export interface PostCardProps {
  post: Post;
}

export interface PostsResponse {
  posts: Post[];
}

export type { Post };

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface Category {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  categories: Category[];
}
