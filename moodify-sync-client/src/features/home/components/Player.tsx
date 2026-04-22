import { useSong } from "../hooks/useSong";

type PlayerProps = {
  mood: string | null;
};

const Player = ({ mood }: PlayerProps) => {
  const { data: song } = useSong(mood ?? "");

  if (!song) return null;

  return (
    <div className="mt-10">
      <div>
        <audio controls src={song.url} />
        <p>{song.title}</p>
      </div>
    </div>
  );
};

export default Player;
