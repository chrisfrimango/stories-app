import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { PostFormData, postSchema } from "../../validation/schema";
import { CreatePostModalProps } from "../../types/postsTypes";
import { useCreatePost } from "../../hooks/usePost";
import { useAlert } from "../../context/alertContext";
import { useCategories } from "../../hooks/usePost";
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

const Option = styled.option`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { showAlert } = useAlert();
  const { data: categories } = useCategories();
  const navigate = useNavigate();
  const { user } = useAuth();
  const createPost = useCreatePost();

  console.log("categories", categories);

  const onSubmit = async (data: PostFormData) => {
    try {
      const response = await createPost.mutateAsync(data);
      showAlert("Post created successfully!", "success");
      reset();
      setTimeout(() => {
        onClose();
        // Hantera navigation här istället
        if (user?.username) {
          navigate(`/${user.username}/post/${response.post.id}`);
        } else {
          navigate(`/post/${response.post.id}`);
        }
      }, 1000);
    } catch (error) {
      console.error("Failed to create post:", error);
      showAlert("Failed to create post", "error");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal
        onClick={(e) => e.stopPropagation()}
        data-testid="create-post-modal"
      >
        <Title>Create New Post</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              {...register("title")}
              placeholder="Post title"
              data-testid="post-title-input"
            />
            {errors.title && <span>{errors.title.message}</span>}
          </FormGroup>

          <FormGroup>
            <TextArea
              {...register("content")}
              placeholder="Write your post content..."
              data-testid="post-content-input"
            />
            {errors.content && <span>{errors.content.message}</span>}
          </FormGroup>

          <FormGroup>
            <Select
              {...register("category")}
              defaultValue=""
              data-testid="category-select"
            >
              <Option value="" disabled>
                Select a category
              </Option>
              {categories?.map((category) => (
                <Option
                  key={category.id}
                  value={category.id}
                  data-testid="category-select-option"
                >
                  {category.name}
                </Option>
              )) || <Option value="">No categories found</Option>}
            </Select>
            {errors.category && (
              <span data-testid="error-message">{errors.category.message}</span>
            )}
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              disabled={createPost.isLoading}
              data-testid="submit-post"
            >
              {createPost.isLoading ? "Creating..." : "Create Post"}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default CreatePostModal;
