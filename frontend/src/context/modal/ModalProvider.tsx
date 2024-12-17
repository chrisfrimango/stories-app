import React, { useState } from "react";
import { ModalContext } from "./context";
import { UserProfile } from "../../types/userTypes";
import { Post } from "../../types/postsTypes";

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

  const contextValue = {
    isCreatePostModalOpen,
    isEditPostModalOpen,
    editingPost,
    openCreatePostModal: () => setIsCreatePostModalOpen(true),
    openEditPostModal: (post: Post) => {
      setEditingPost(post);
      setIsEditPostModalOpen(true);
    },
    closeCreatePostModal: () => setIsCreatePostModalOpen(false),
    closeEditPostModal: () => {
      setIsEditPostModalOpen(false);
      setEditingPost(null);
    },
    isEditProfileModalOpen,
    editingProfile,
    openEditProfileModal: (profile: UserProfile) => {
      setEditingProfile(profile);
      setIsEditProfileModalOpen(true);
    },
    closeEditProfileModal: () => {
      setIsEditProfileModalOpen(false);
      setEditingProfile(null);
    },
    isChangePasswordModalOpen,
    openChangePasswordModal: () => setIsChangePasswordModalOpen(true),
    closeChangePasswordModal: () => setIsChangePasswordModalOpen(false),
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
