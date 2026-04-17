import FaceExpression from "../../expression/components/FaceExpression";

const Home = () => {
  return (
    <>
      <div className="text-white flex justify-center">
        <FaceExpression
          onClick={(expression) => {
            handleGetSong({ mood: expression });
          }}
        />
      </div>
    </>
  );
};

export default Home;
