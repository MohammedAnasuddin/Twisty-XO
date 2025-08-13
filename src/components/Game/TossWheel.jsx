import React, { useState, useEffect , useContext} from "react";
import { Wheel } from "react-custom-roulette";
import { GameContext } from '../context/GameContext.jsx'

const TossWheel = ({ playerOne , playerTwo , prize}) => {
  const [data, setData] = useState([]);
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
    const {gameSetup, updateGameSetup} = useContext(GameContext)

  useEffect(() => {
    // Alternate slots between playerOne and playerTwo
    const slots = Array.from({ length: 8 }, (_, i) => ({
       option: String(i % 2 === 0 ? playerOne : playerTwo),
    }));

    setData(slots);
    // setPrizeNumber(Math.floor(Math.random() * slots.length));

    // Start spinning after short delay
    setTimeout(() => setMustStartSpinning(true), 50);
     
   

  }, [playerOne, playerTwo]);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      {data.length > 0 && (
        <Wheel
          mustStartSpinning={mustStartSpinning}
          prizeNumber={prize}
          data={data}
          onStopSpinning={() => {

              setMustStartSpinning(false)
               
                // Decide winner here. The `turn` will be set later, after symbol selection.
                if (prize % 2 === 0) {
                updateGameSetup(["tossWinner"], 0);
                } else {
                updateGameSetup(["tossWinner"], 1);
    }
          }
        }
        />
      )}
    </div>
  );
};

export default TossWheel;
