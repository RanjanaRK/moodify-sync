import { useRef, useState } from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import SongDrawer from "../components/SongDrawer";
import MusicBackground from "../components/SongPlayer";
import { useAllSongs } from "../hooks/useSong";
import type { Song } from "../utils/types";

const Home = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data } = useAllSongs();

  return (
    <>
      <div className="text-white flex justify-center pt-24">
        {mood ? (
          <MusicBackground mood={mood} audioRef={audioRef} />
        ) : (
          <FaceExpression onClick={(expression) => setMood(expression)} />
        )}

        <SongDrawer
          songs={data || []}
          currentSongId={currentSong?.url}
          onSelect={(song) => {
            setCurrentSong(song);

            if (audioRef.current) {
              audioRef.current.src = song.url;
              audioRef.current.play();
            }
          }}
        />
        {/* {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading song</p>} */}
      </div>
    </>
  );
};

export default Home;
