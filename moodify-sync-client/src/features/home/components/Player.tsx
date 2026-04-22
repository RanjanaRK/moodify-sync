import { useQueryClient } from "@tanstack/react-query";

type PlayerProps = {
  mood: string | null;
};

const Player = ({ mood }: PlayerProps) => {
  const queryClient = useQueryClient();

  const song = queryClient.getQueryData(["song", mood]) as any;

  if (!song) return null;

  return (
    <>
      <div>
        <audio src={song.url} />
        <p>{song.title}</p>
      </div>
    </>
  );
};

export default Player;
