import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const GameInfo = () => {
  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);
  const [shift, setShift] = useState("translate-x-[20%]");
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => setShowTooltip((prev) => !prev);

  // Auto-position tooltip
  useEffect(() => {
    if (!showTooltip) return;

    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    let newShift = "translate-x-[20%]";

    // Right overflow
    if (tooltipRect.right > viewportWidth - 8) {
      newShift = "translate-x-[-20%]";
    }

    // Left overflow
    if (tooltipRect.left < 8) {
      newShift = "translate-x-[40%]";
    }

    setShift(newShift);
  }, [showTooltip]);

  return (
    <div className="col-start-1 row-span-2 row-start-1 p-4 sm:p-8 bg-base-200 l2 col-span-full lg:col-span-8 md:row-span-1 lg:row-span-full rounded-xl">
      {/* Title */}
      <p className="text-xl subpixel-antialiased sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bungee3d">
        Win or Witness Others Win{" "}
        <span className="inline text-red-700 sm:block md:inline lg:block">
          NO DRAW
        </span>
      </p>

      {/* Rules */}
      <p className="my-4 text-sm sm:text-base md:text-2xl lg:text-3xl 2xl:text-4xl sm:my-2 md:my-5 font-ox">
        You can only keep{" "}
        <span className="font-bold text-primary">3 marks</span> on the board.
        <br className="hidden sm:block" />
        Every new move removes your {/* Tooltip trigger */}
        <span
          ref={triggerRef}
          className="relative inline-block font-bold cursor-pointer select-none text-primary"
          onClick={toggleTooltip} // tap for mobile
          onMouseEnter={() => setShowTooltip(true)} // hover (desktop)
          onMouseLeave={() => setShowTooltip(false)} // hover leave (desktop)
        >
          oldest
          {/* Tooltip */}
          <span
            ref={tooltipRef}
            className={clsx(
              "absolute top-full left-1/2 mt-2",
              shift, // ← dynamic, auto-adjusted
              "px-3 py-2 rounded-lg bg-base-300 shadow-xl border border-base-200",
              "text-xs md:text-sm whitespace-nowrap z-50",
              "transition-all duration-200 ease-out pointer-events-none",
              showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            {/* Symbol demo */}
            <span
              className="
                inline-block font-ox text-lg font-bold 
                text-[oklch(55%_0.22_275)] dark:text-[oklch(78%_0.22_275)]
                animate-pulsate
              "
            >
              X
            </span>

            <span className="ml-2 opacity-90">= oldest move preview</span>
          </span>
        </span>
      </p>
    </div>
  );
};

export default GameInfo;
