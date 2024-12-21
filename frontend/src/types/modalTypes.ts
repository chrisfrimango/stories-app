import { UserProfile } from "./userTypes";
import { Post } from "./api";

export interface ModalContextType {
  isCreatePostModalOpen: boolean;
  isEditPostModalOpen: boolean;
  isEditProfileModalOpen: boolean;
  isChangePasswordModalOpen: boolean;
  editingPost: Post | null;
  editingProfile: UserProfile | null;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;
  openEditPostModal: (post: Post) => void;
  closeEditPostModal: () => void;
  openEditProfileModal: (profile: UserProfile) => void;
  closeEditProfileModal: () => void;
  openChangePasswordModal: () => void;
  closeChangePasswordModal: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
  initialState?: {
    editingPost?: Post | null;
    editingProfile?: UserProfile | null;
    isCreatePostModalOpen?: boolean;
    isEditPostModalOpen?: boolean;
    isEditProfileModalOpen?: boolean;
    isChangePasswordModalOpen?: boolean;
  };
}
