import { useQuery } from "@tanstack/react-query";
import type { Song } from "../utils/types";
import { getSong } from "../service/song.api";

export const useSong = (mood: string) => {
  return useQuery<Song>({
    queryKey: ["song", mood],

    queryFn: () => getSong({ mood }),

    enabled: !!mood,

    staleTime: 1000 * 60 * 5,

    retry: 2,

    refetchOnWindowFocus: false,
  });
};
