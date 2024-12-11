import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostsResponse, Post, CategoriesResponse } from "../types/postsTypes";
import { api } from "../services/authService";
import { PostFormData } from "../validation/schema";
import { UserProfile } from "../types/userTypes";
import { useAlert } from "../context/alertContext";
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
    console.log("🚀 ~ postData:", postData);
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
    select: (data) => data.post,
  });
}

export function useDeletePost(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postApi.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.removeQueries({ queryKey: ["post", id] });
      return "Post deleted successfully";
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFormData) => postApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      return response; // Returnera response så komponenten kan använda den
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

export interface UseHandlePostDeleteOptions {
  postId: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export function useHandlePostDelete({
  postId,
  onSuccess,
  redirectTo,
}: UseHandlePostDeleteOptions) {
  const { showAlert } = useAlert();
  const deletePost = useDeletePost(postId);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(undefined, {
        onSuccess: () => {
          showAlert("Post deleted successfully", "success");
          if (redirectTo) {
            navigate(redirectTo);
          }
          onSuccess?.();
        },
        onError: () => {
          showAlert("Error deleting post", "error");
        },
      });
    }
  };

  return { handleDelete, isDeleting: deletePost.isLoading };
}
