import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "../types/userTypes";
import { Post, ModalContextType } from "../types/postsTypes";

interface ModalProviderProps {
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

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  initialState = {},
}) => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(
    initialState.isCreatePostModalOpen ?? false
  );
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(
    initialState.isEditPostModalOpen ?? false
  );
  const [editingPost, setEditingPost] = useState<Post | null>(
    initialState.editingPost ?? null
  );

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(
    initialState.isEditProfileModalOpen ?? false
  );
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(
    initialState.editingProfile ?? null
  );

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(
    initialState.isChangePasswordModalOpen ?? false
  );

  const openCreatePostModal = () => setIsCreatePostModalOpen(true);
  const openEditPostModal = (post: Post) => {
    setEditingPost(post);
    setIsEditPostModalOpen(true);
  };
  const closeCreatePostModal = () => setIsCreatePostModalOpen(false);
  const closeEditPostModal = () => {
    setIsEditPostModalOpen(false);
    setEditingPost(null);
  };

  const openEditProfileModal = (profile: UserProfile) => {
    setEditingProfile(profile);
    setIsEditProfileModalOpen(true);
  };
  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
    setEditingProfile(null);
  };

  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
  const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isCreatePostModalOpen,
        isEditPostModalOpen,
        editingPost,
        openCreatePostModal,
        openEditPostModal,
        closeCreatePostModal,
        closeEditPostModal,
        isEditProfileModalOpen,
        editingProfile,
        openEditProfileModal,
        closeEditProfileModal,
        isChangePasswordModalOpen,
        openChangePasswordModal,
        closeChangePasswordModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
