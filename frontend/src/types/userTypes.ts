export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  created_at: string;
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
