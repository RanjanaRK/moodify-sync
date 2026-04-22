import type { AxiosError } from "axios";
import type { GetSongParams, GetSongResponse, Song } from "../utils/types";
import { api } from "../../../shared/lib/api";

export const getSong = async ({ mood }: GetSongParams): Promise<Song> => {
  try {
    const response = await api.get<GetSongResponse>("/api/song", {
      params: { mood },
    });

    return response.data.song;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    console.error("getSong error:", err.response?.data || err.message);

    throw new Error(err.response?.data?.message || "Failed to fetch song");
  }
};
