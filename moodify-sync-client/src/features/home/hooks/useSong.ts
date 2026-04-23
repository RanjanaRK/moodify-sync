import { useQuery } from "@tanstack/react-query";

import { getallSongs, getSong } from "../service/song.api";
import type { Song } from "../utils/types";

export const useSong = (mood: string) => {
  return useQuery<Song>({
    queryKey: ["song", mood],
    queryFn: () => getSong(mood),

    // enabled: !!mood,

    staleTime: 1000 * 60 * 5,

    retry: 2,

    refetchOnWindowFocus: false,
  });
};

export const useAllSongs = () => {
  return useQuery<Song[]>({
    queryKey: ["song", "all"],
    queryFn: getallSongs,
  });
};
