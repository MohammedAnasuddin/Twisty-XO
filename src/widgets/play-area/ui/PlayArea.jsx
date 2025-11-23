import { useContext } from "react";
import { GameContext } from "../../../entities/game/model/GameContext";
import ModeSelect from "../../../features/mode-select/ui/ModeSelect.jsx";
import GridArea from "../../grid-area/ui/GridArea";

const PlayArea = () => {
  const { gameSetup } = useContext(GameContext);
  //flex flex-col w-full h-full p-4 l2 bg-base-200 h- lg:w-8/16 gap-y-4
  return (
    <div className="grid col-start-1 row-start-3 p-2 l2 md:row-start-2 lg:row-start-1 row-span-15 lg:row-span-full lg:col-start-9 col-span-full grid-cols-subgrid grid-rows-subgrid sm:p-8">
      {gameSetup.mode === null ? <ModeSelect /> : <GridArea />}
    </div>
  );
};

export default PlayArea;
