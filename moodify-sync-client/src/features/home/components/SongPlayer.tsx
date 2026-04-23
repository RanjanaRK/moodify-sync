import { useEffect, type RefObject } from "react";
import { useSong } from "../hooks/useSong";
import type { Song } from "../utils/types";

type Props = {
  mood: string | null;
  onAutoPlay: (song: Song) => void;
};

const MusicBackground = ({ mood, onAutoPlay }: Props) => {
  const { data: song } = useSong(mood ?? "");

  useEffect(() => {
    if (!song) return;

    onAutoPlay(song);
  }, [song]);

  if (!song) return null;

  return (
    <div className="text-center text-white text-3xl">
      <h2>{song.mood} mood </h2>
    </div>
  );
};

export default MusicBackground;
