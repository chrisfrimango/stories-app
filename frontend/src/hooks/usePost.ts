import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "../context/alert";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/postApi";
import type { PostFormData } from "../validation/schema";
import type { UseHandlePostDeleteOptions } from "../types/postsTypes";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postApi.fetchAll,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postApi.fetchById(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: postApi.fetchCategories,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: postApi.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showAlert("Post created successfully", "success");
      return response;
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      showAlert("Error creating post", "error");
      throw error;
    },
  });
}

export function useEditPost(id: string) {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: (data: PostFormData) => {
      return postApi.updateById(id, {
        title: data.title,
        content: data.content,
        category_id: data.category_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      showAlert("Post updated successfully", "success");
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      showAlert("Error updating post", "error");
    },
  });
}

export function useDeletePost({
  postId,
  onSuccess,
  redirectTo,
}: UseHandlePostDeleteOptions) {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => postApi.deleteById(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.removeQueries({ queryKey: ["post", postId] });
      showAlert("Post deleted successfully", "success");
      if (redirectTo) {
        navigate(redirectTo);
      }
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      showAlert("Error deleting post", "error");
    },
  });

  return {
    handleDelete: () => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        mutation.mutate();
      }
    },
    isDeleting: mutation.isLoading,
  };
}
