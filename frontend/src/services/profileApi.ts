import { api } from "./authService";
import { UserProfile } from "../types/userTypes";

export const profileApi = {
  fetchProfile: async (id: string) => {
    const { data } = await api.get<UserProfile>(`/profile/${id}`);
    return data;
  },
};
