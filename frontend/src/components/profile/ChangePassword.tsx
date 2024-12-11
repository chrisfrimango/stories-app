import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePassword } from "../../hooks/useProfile";
import { useAlert } from "../../context/alertContext";
import { PasswordInput, passwordSchema } from "../../validation/schema";
import { Error } from "../../ui/Error";
import { useAuth } from "../../context/authContext";

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
  max-width: 500px;
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

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const changePassword = useChangePassword(user?.id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordInput) => {
    changePassword.mutate(data, {
      onSuccess: () => {
        showAlert("Password changed successfully!", "success");
        onClose();
        reset();
      },
      onError: (error) => {
        console.error("Error changing password:", error);
        showAlert("Failed to change password", "error");
      },
    });
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal
        data-testid="change-password-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Title>Change Password</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Current Password</Label>
            <Input
              type="password"
              {...register("currentPassword")}
              placeholder="Enter your current password"
              data-testid="current-password-input"
            />
            {errors.currentPassword && (
              <Error
                data-testid="error-message"
                message={errors.currentPassword.message}
              />
            )}
          </FormGroup>

          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              {...register("newPassword")}
              placeholder="Enter your new password"
              data-testid="new-password-input"
            />
            {errors.newPassword && (
              <Error
                data-testid="error-message"
                message={errors.newPassword.message}
              />
            )}
          </FormGroup>

          <FormGroup>
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your new password"
              data-testid="confirm-password-input"
            />
            {errors.confirmPassword && (
              <Error
                data-testid="error-message"
                message={errors.confirmPassword.message}
              />
            )}
          </FormGroup>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={onClose}
              data-testid="change-password-cancel"
            >
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              disabled={changePassword.isLoading}
              data-testid="change-password-save"
            >
              {changePassword.isLoading ? "Changing..." : "Change Password"}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default ChangePassword;
