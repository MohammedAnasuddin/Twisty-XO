import GameInfo from "../components/Containers/GameInfo.jsx";
import PlayArea from "../components/Containers/PlayArea.jsx";

const GameBody = () => {
  return (
    <div className="bg-base-200 p-2 row-start-2  row-span-17 md:row-span-8 col-span-16  grid grid-cols-subgrid grid-rows-subgrid l1 ">
      <GameInfo />
      <PlayArea />
    </div>
  );
};

export default GameBody;
