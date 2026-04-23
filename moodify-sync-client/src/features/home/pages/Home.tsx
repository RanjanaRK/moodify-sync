import { useState } from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import { useAllSongs } from "../hooks/useSong";
import SongPlayer from "../components/SongPlayer";
import MusicBackground from "../components/SongPlayer";
import MusicUI from "../components/SongPlayer";

const Home = () => {
  const [mood, setMood] = useState<string | null>(null);

  const { data } = useAllSongs();

  return (
    <>
      <div className="text-white flex justify-center pt-24">
        {mood ? (
          <MusicBackground mood={mood} />
        ) : (
          <FaceExpression onClick={(expression) => setMood(expression)} />
        )}

        {/* {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading song</p>} */}
      </div>
    </>
  );
};

export default Home;
