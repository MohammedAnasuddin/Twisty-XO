import { useEffect, useState,memo} from "react";
import clsx from "clsx";

const Cell = ({
  symbol,
  insertSymbol,
  index,
  isOldest,
  isWinning,
  winningColor,
}) => {
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
    isWinning && winningColor ? { "--win-color": winningColor } : {};

  return (
    <div
      onClick={handleFill}
      style={winStyle}
      className={clsx(
        "m-2 bg-base-300 flex items-center justify-center font-bold text-5xl md:text-7xl select-none",

        isWinning && "animate-sweep-glow animate-steady-glow",

        !isWinning && !isFilled && "cell-hover-pop",

        !isWinning &&
          !isOldest &&
          isFilled &&
          hoverReady &&
          "hover:animate-shake",
      )}
    >
      <p
        className={clsx(
          "font-ox",

          shouldPop && "animate-symbol-pop",

          !shouldPop && !isWinning && isOldest && "animate-pulsate",

          symbol === "X" &&
            "text-[oklch(55%_0.22_275)] dark:text-[oklch(78%_0.22_275)]",
          symbol === "O" &&
            "text-[oklch(72%_0.18_85)] dark:text-[oklch(80%_0.20_90)]",
        )}
      >
        {symbol ?? ""}
      </p>
    </div>
  );
};

export default memo(Cell);
