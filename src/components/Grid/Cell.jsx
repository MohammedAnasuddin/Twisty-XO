import { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { GameContext } from "../context/GameContext";

const Cell = ({ symbol, insertSymbol, index, isOldest, isWinning }) => {
  const { gameSetup } = useContext(GameContext);

  const [hoverReady, setHoverReady] = useState(true);
  const [shouldPop, setShouldPop] = useState(false);

  const isFilled = symbol != null;

  // 🟦 HANDLE CLICK
  const handleFill = () => {
    if (!symbol) {
      insertSymbol(index);
      setHoverReady(false);
      setTimeout(() => setHoverReady(true), 700);
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

  // 🟨 STEADY GLOW (AFTER SWEEP)
  useEffect(() => {
    if (isWinning) {
      const t = setTimeout(() => {}, 900);
      return () => clearTimeout(t);
    }
  }, [isWinning]);

  return (
    <div
      onClick={handleFill}
      style={winStyle}
      className={clsx(
        "m-2 bg-base-300 flex items-center justify-center font-bold text-5xl md:text-7xl select-none",

        // 🥇 WINNING ANIMATIONS
        isWinning && "animate-sweep-glow animate-steady-glow",

        // 🔹 EMPTY CELL HOVER (springy premium UX)
        !isWinning && !isFilled && "cell-hover-pop",

        // 🔸 SHAKE FOR NORMAL FILLED CELLS
        !isWinning &&
          !isOldest &&
          isFilled &&
          hoverReady &&
          "hover:animate-shake"
      )}
    >
      <p
        className={clsx(
          "font-ox",

          // 🎉 POP-IN ON SYMBOL ADD
          shouldPop && "animate-symbol-pop",

          // 🔸 OLDEST MOVE PULSE (if not winning)
          !shouldPop && !isWinning && isOldest && "animate-pulsate",

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
