import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "../types/userTypes";
import { Post, ModalContextType } from "../types/postsTypes";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(
    null
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

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
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
