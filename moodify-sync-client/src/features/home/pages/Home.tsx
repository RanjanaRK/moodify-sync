import { useState } from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/player";

const Home = () => {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <>
      <div className="text-white flex justify-center pt-24">
        <FaceExpression onClick={(expression) => setMood(expression)} />

        {/* {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading song</p>} */}

        <Player mood={mood} />
      </div>
    </>
  );
};

export default Home;
