import axios from "axios";
import { api } from "../../../shared/lib/api";

export const getMe = async () => {
  try {
    const currentUser = await api.get("/api/user/me");

    return currentUser.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
