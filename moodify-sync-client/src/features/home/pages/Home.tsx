import { useEffect, useState } from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import { useSong } from "../hooks/useSong";
import Player from "../components/player";

const Home = () => {
  const [mood, setMood] = useState<string | null>(null);

  const { data: song } = useSong(mood as string);

  return (
    <>
      <div className="text-white flex justify-center pt-24">
        <FaceExpression onClick={(exp) => setMood(exp)} />

        {/* {isLoading && <p>Loading song...</p>}
        {isError && <p>Failed to load song</p>} */}

        {/* {song && ( */}
        {/* <div className="bg-zinc-800 p-4 rounded-xl text-center">
          <img
            src={"song.posterUrl"}
            className="w-32 h-32 rounded-lg mx-auto mb-2"
          />
          <p className="font-semibold">avs</p>
          <span className="text-orange-400">sad</span>
        </div> */}
        {/* )} */}

        <Player mood={mood} />
      </div>
    </>
  );
};

export default Home;
