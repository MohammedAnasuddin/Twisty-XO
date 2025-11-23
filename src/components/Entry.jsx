import { GameProvider } from "../entities/game/model/GameContext";
import GameBody from "../pages/game/ui/GameBody.jsx";
import NavBar from "../widgets/navbar/ui/NavBar.jsx";
const Entry = () => {
  return (
    <GameProvider>
      <div className="w-screen h-screen grow-16 bg-base-100 xl:max-w-6xl xl:mx-auto">
        <div className="w-full row-span-1 bg-base-200 l1 col-span-16">
          <NavBar />
        </div>
        <GameBody />
      </div>
    </GameProvider>
  );
};

export default Entry;
