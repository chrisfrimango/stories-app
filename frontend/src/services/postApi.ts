import { api } from "./authService";
import { PostsResponse, CategoriesResponse } from "../types/postsTypes";
import { Post } from "../types/postTypes";
import { PostFormData } from "../validation/schema";

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
