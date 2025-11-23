import { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { GameContext } from "../context/GameContext";

const Cell = ({ symbol, insertSymbol, index, isOldest, isWinning }) => {
  const { gameSetup } = useContext(GameContext);

  const [hoverReady, setHoverReady] = useState(true);
  const [steadyGlow, setSteadyGlow] = useState(false);
  const [shouldPop, setShouldPop] = useState(false);

  const isFilled = symbol != null;

  // 🟦 HANDLE CLICK
  const handleFill = () => {
    if (!symbol) {
      insertSymbol(index);
      setHoverReady(false);
      setTimeout(() => setHoverReady(true), 700);
    } else {
      alert("Already filled Try another cell");
    }
  };

  // 🟧 POP-IN (only when symbol is first added)
  useEffect(() => {
    if (symbol) {
      setShouldPop(true);
      const t = setTimeout(() => setShouldPop(false), 180);
      return () => clearTimeout(t);
    }
  }, [symbol]);

  // 🟩 WINNING COLOR VARIABLE
  const winStyle =
    isWinning && gameSetup.winningColor
      ? { "--win-color": gameSetup.winningColor }
      : {};

  // 🟨 STEADY GLOW AFTER SWEEP
  useEffect(() => {
    if (isWinning) {
      setSteadyGlow(false);
      const t = setTimeout(() => setSteadyGlow(true), 900);
      return () => clearTimeout(t);
    }
    setSteadyGlow(false);
  }, [isWinning]);

  return (
    <div
      onClick={handleFill}
      style={winStyle}
      className={clsx(
        "m-2  bg-base-300 flex items-center justify-center font-bold text-5xl md:text-7xl",

        // 🥇 WINNING ANIMATION
        isWinning && "animate-sweep-glow",
        isWinning && "animate-steady-glow",

        // 🔸 OLDEST MOVE (ONLY IF NOT WINNING)

        // 🔹 SHAKE FOR NORMAL FILLED CELLS
        !isWinning &&
          !isOldest &&
          isFilled &&
          hoverReady &&
          "hover:animate-shake",

        // ▪ EMPTY HOVER
        !isWinning &&
          !isFilled &&
          "hover:scale-105 hover:shadow-lg transition-transform transition-shadow duration-200 ease-[cubic-bezier(0.22,_1,_0.36,_1)]"
      )}
    >
      <p
        className={clsx(
          "font-ox",
          !isWinning && isOldest && "animate-pulsate",
          // 🎉 POP-IN ON SYMBOL ADD
          shouldPop && "animate-symbol-pop",

          // 🎨 COLORING
          symbol === "X" &&
            "text-[oklch(55%_0.22_275)] dark:text-[oklch(78%_0.22_275)]",
          symbol === "O" &&
            "text-[oklch(72%_0.18_85)] dark:text-[oklch(80%_0.20_90)]"
        )}
      >
        {symbol ?? ""}
      </p>
    </div>
  );
};

export default Cell;
