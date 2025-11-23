import { GameProvider } from "../entities/game/model/GameContext";
import GameBody from "../pages/game/ui/GameBody.jsx";
import NavBar from "../widgets/navbar/ui/NavBar.jsx";
const Entry = () => {
  return (
    <GameProvider>
      <div className="grow-16 w-screen h-screen bg-base-100 overflow-y-hidden  xl:max-w-6xl xl:mx-auto">
        <div className="bg-base-200 w-full l1 row-span-1 col-span-16">
          <NavBar />
        </div>
        <GameBody />
      </div>
    </GameProvider>
  );
};

export default Entry;
