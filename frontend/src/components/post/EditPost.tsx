import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormData, postSchema } from "../../validation/schema";
import { EditPostModalProps } from "../../types/postsTypes";
import { useAlert } from "../../context/alertContext";
import { useEditPost, useCategories } from "../../hooks/usePost";
import { useModal } from "../../context/modalContext";

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

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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
`;

const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose }) => {
  const { editingPost } = useModal();
  console.log(editingPost);
  const { showAlert } = useAlert();
  const editPost = useEditPost(editingPost?.id?.toString() ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    editPost.mutate(data, {
      onSuccess: () => {
        showAlert("Post edited successfully", "success");
        onClose();
      },
      onError: () => {
        showAlert("Failed to edit post", "error");
      },
    });
  };

  const { data: categories } = useCategories();

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Edit Post</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input {...register("title")} defaultValue={editingPost?.title} />
            {errors.title && <span>{errors.title.message}</span>}
          </FormGroup>

          <FormGroup>
            <TextArea
              {...register("content")}
              defaultValue={editingPost?.content}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </FormGroup>

          <FormGroup>
            <Select
              {...register("category")}
              defaultValue={editingPost?.category_name || ""}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            {errors.category && <span>{errors.category.message}</span>}
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" disabled={editPost.isLoading}>
              {editPost.isLoading ? "Editing..." : "Edit Post"}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default EditPostModal;
