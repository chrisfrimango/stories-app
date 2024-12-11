import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "../../context/modalContext";
import { useUpdateProfile } from "../../hooks/useProfile";
import { useAlert } from "../../context/alertContext";
import { ProfileInput, profileSchema } from "../../validation/schema";
import { Error } from "../../ui/Error";
import { EditProfileModalProps } from "../../types/userTypes";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const EditProfile: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { editingProfile } = useModal();
  console.log(editingProfile);
  const { showAlert } = useAlert();
  const updateProfile = useUpdateProfile(editingProfile?.id?.toString() ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      bio: "",
      email: "",
    },
  });

  useEffect(() => {
    if (editingProfile) {
      reset({
        username: editingProfile.username,
        bio: editingProfile.bio,
        email: editingProfile.email,
      });
    }
  }, [editingProfile, reset]);

  const onSubmit = (data: ProfileInput) => {
    console.log(data);
    updateProfile.mutate(data, {
      onSuccess: () => {
        showAlert("Profile updated successfully!", "success");
        onClose();
        reset();
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        showAlert("Failed to update profile", "error");
      },
    });
  };

  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <Modal
        data-testid="edit-profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Title>Edit Profile</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              data-testid="edit-profile-name"
              {...register("username")}
              placeholder="Your name"
            />
            {errors.username && (
              <Error
                data-testid="error-message"
                message={errors.username.message}
              />
            )}
          </FormGroup>

          <FormGroup>
            <Label>Bio</Label>
            <TextArea
              data-testid="edit-profile-bio"
              {...register("bio")}
              rows={4}
              placeholder="Tell us about yourself"
            />
            {errors.bio && (
              <Error data-testid="error-message" message={errors.bio.message} />
            )}
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              data-testid="edit-profile-email"
              {...register("email")}
              type="email"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <Error
                data-testid="error-message"
                message={errors.email.message}
              />
            )}
          </FormGroup>

          <ButtonGroup>
            <CancelButton
              data-testid="edit-profile-cancel"
              type="button"
              onClick={onClose}
            >
              Cancel
            </CancelButton>
            <SubmitButton data-testid="edit-profile-submit" type="submit">
              {updateProfile.isLoading ? "Saving..." : "Save Changes"}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default EditProfile;
