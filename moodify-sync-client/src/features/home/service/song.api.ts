import type { AxiosError } from "axios";
import { api } from "../../../shared/lib/api";
import type { GetSongResponse, GetSongsResponse, Song } from "../utils/types";

export const getSong = async (mood: string): Promise<Song> => {
  try {
    const response = await api.get<GetSongResponse>("/api/song", {
      params: { mood },
    });
    console.log(response);

    return response.data.song;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    console.error("getSong error:", err.response?.data || err.message);

    throw new Error(err.response?.data?.message || "Failed to fetch song");
  }
};

export const getallSongs = async (): Promise<Song[]> => {
  try {
    const response = await api.get<GetSongsResponse>("/api/song/all");

    return response.data.songs;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    console.error("getSong error:", err.response?.data || err.message);

    throw new Error(err.response?.data?.message || "Failed to fetch song");
  }
};

export const uploadSongs = async () => {};
