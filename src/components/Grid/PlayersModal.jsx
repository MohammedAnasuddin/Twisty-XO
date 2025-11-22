import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useContext, useState } from "react";
import PlayerInput from "./PlayerInput";
import { GameContext } from "../context/GameContext";
import { Link } from "react-router";

export default function PlayersModal(props) {
  const { updateGameSetup } = useContext(GameContext);
  const [player_1_Name, setPlayerOneName] = useState("");
  const [player_2_Name, setPlayerTwoName] = useState("");
  const { mode } = props;

  let [isOpen, setIsOpen] = useState(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function updatePlayerNames(name1, name2) {
    if (mode == "vsComputer") {
      name1 = "Computer";
      updateGameSetup(["players", 0, "name"], name1);
      updateGameSetup(["players", 0, "isComputer"], true);
    } else {
      updateGameSetup(["players", 0, "name"], name1);
      updateGameSetup(["players", 0, "isComputer"], false);
    }

    updateGameSetup(["players", 1, "name"], name2);
  }

  return (
    <div className="">
      <Dialog
        open={true}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className=" fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border-2 border-slate-500 bg-slate-600 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Who would be Playing
              </DialogTitle>

              <div>
                {mode == "vsComputer" ? (
                  <PlayerInput
                    label="Player Name"
                    value={player_2_Name}
                    onChange={(e) => {
                      setPlayerTwoName(e.target.value);
                    }}
                  />
                ) : (
                  <>
                    <PlayerInput
                      label="Player-1"
                      value={player_1_Name}
                      onChange={(e) => {
                        setPlayerOneName(e.target.value);
                      }}
                    />
                    <PlayerInput
                      label="Player-2"
                      value={player_2_Name}
                      onChange={(e) => {
                        setPlayerTwoName(e.target.value);
                      }}
                    />
                  </>
                )}
              </div>

              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-amber-600 data-open:bg-gray-700"
                  onClick={() => {
                    updatePlayerNames(player_1_Name, player_2_Name);
                  }}
                >
                  Let's Play
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
