import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PostsResponse,
  Post,
  CategoriesResponse,
  UseHandlePostDeleteOptions,
} from "../types/postsTypes";
import { api } from "../services/authService";
import { PostFormData } from "../validation/schema";
import { UserProfile } from "../types/userTypes";
import { useAlert } from "../context/alert";
import { useNavigate } from "react-router-dom";

export const postApi = {
  fetchAll: async () => {
    const { data } = await api.get<PostsResponse>("/posts");
    return data.posts;
  },

  fetchById: async (id: string) => {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
  },
  create: async (postData: PostFormData) => {
    const { data } = await api.post("/posts", postData);
    return data;
  },
  deleteById: async (id: string) => {
    await api.delete(`/posts/${id}`);
  },
  updateById: async (id: string, data: PostFormData) => {
    await api.put(`/posts/${id}`, data);
  },
  fetchCategories: async () => {
    const { data } = await api.get<CategoriesResponse>("/categories");
    return data.categories;
  },
};

export const profileApi = {
  fetchProfile: async (id: string) => {
    const { data } = await api.get<UserProfile>(`/profile/${id}`);
    return data;
  },
};

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
    select: (data: Post) => data,
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      mutation.mutate();
    }
  };

  return { handleDelete, isDeleting: mutation.isLoading };
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFormData) => postApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      return response;
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      throw error;
    },
  });
}

export function useEditPost(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostFormData) => postApi.updateById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      return "Post updated successfully";
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: postApi.fetchCategories,
  });
}

export function useProfile(id: string) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => profileApi.fetchProfile(id),
  });
}
