import { Post } from "./api";
import { UserProfile } from "./userTypes";

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

export type { Post };

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalContextType {
  isCreatePostModalOpen: boolean;
  isEditPostModalOpen: boolean;
  editingPost: Post | null;
  openCreatePostModal: () => void;
  openEditPostModal: (post: Post) => void;
  closeCreatePostModal: () => void;
  closeEditPostModal: () => void;

  isEditProfileModalOpen: boolean;
  editingProfile: UserProfile | null;
  openEditProfileModal: (profile: UserProfile) => void;
  closeEditProfileModal: () => void;

  isChangePasswordModalOpen: boolean;
  openChangePasswordModal: () => void;
  closeChangePasswordModal: () => void;
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
