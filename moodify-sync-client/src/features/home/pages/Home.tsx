import { useState } from "react";
import { useOutletContext } from "react-router";
import FaceExpression from "../../expression/components/FaceExpression";
import MusicBackground from "../components/SongPlayer";
import type { Song } from "../utils/types";

const Home = () => {
  const [mood, setMood] = useState<string | null>(null);

  const { onPlay } = useOutletContext<{ onPlay: (song: Song) => void }>();
  return (
    <>
      <div className="text-white flex justify-center ">
        {mood ? (
          <MusicBackground mood={mood} onAutoPlay={onPlay} />
        ) : (
          <FaceExpression onClick={(expression) => setMood(expression)} />
        )}
      </div>
    </>
  );
};

export default Home;
