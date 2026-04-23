import axios from "axios";
import { api } from "../../../shared/lib/api";

export const uploadSongs = async (formValue: FormData) => {
  try {
    const res = await api.post("/api/song", formValue);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }

    throw new Error("Something went wrong");
  }
};
