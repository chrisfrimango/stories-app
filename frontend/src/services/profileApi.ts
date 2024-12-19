import { api } from "./authService";
import { UserProfile } from "../types/userTypes";
import { PasswordInput, ProfileInput } from "../validation/schema";

export const profileApi = {
  fetchProfile: async (id: string) => {
    const { data } = await api.get<UserProfile>(`/profile/${id}`);
    return data;
  },
  updateProfile: async (id: string, data: ProfileInput) => {
    const { data: response } = await api.put<UserProfile>(
      `/profile/${id}`,
      data
    );
    return response;
  },
  changePassword: async (id: string, data: PasswordInput) => {
    await api.put(`/profile/${id}/change-password`, data);
  },
  deleteProfile: async (id: string) => {
    await api.delete(`/profile/${id}`);
  },
};
