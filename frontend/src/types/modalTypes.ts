import { UserProfile } from "./userTypes";
import { Post } from "./api";

// Kombinera alla modal-relaterade states i ett interface
export interface ModalState {
  createPost: {
    isOpen: boolean;
  };
  editPost: {
    isOpen: boolean;
    post: Post | null;
  };
  editProfile: {
    isOpen: boolean;
    profile: UserProfile | null;
  };
  changePassword: {
    isOpen: boolean;
  };
}

export interface ModalContextType {
  state: ModalState;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;
  openEditPostModal: (post: Post) => void;
  closeEditPostModal: () => void;
  openEditProfileModal: (profile: UserProfile) => void;
  closeEditProfileModal: () => void;
  openChangePasswordModal: () => void;
  closeChangePasswordModal: () => void;
}
