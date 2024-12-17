import { UserProfile } from "./userTypes";
import { Post } from "./postsTypes";

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
