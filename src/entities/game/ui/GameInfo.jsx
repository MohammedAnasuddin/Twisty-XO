import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const GameInfo = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [shift, setShift] = useState("translate-x-[20%]");
  const [placeAbove, setPlaceAbove] = useState(false);

  // ✅ Plain JS refs (no TypeScript generics)
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => setShowTooltip((prev) => !prev);

  useEffect(() => {
    if (!showTooltip) return;

    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // ---------- Horizontal auto-shift ----------
    let newShift = "translate-x-[20%]";

    if (tooltipRect.right > viewportWidth - 8) {
      newShift = "translate-x-[-20%]";
    }

    if (tooltipRect.left < 8) {
      newShift = "translate-x-[40%]";
    }

    setShift(newShift);

    // ---------- Vertical auto-flip ----------
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    const shouldPlaceAbove =
      spaceBelow < tooltipRect.height + 8 &&
      spaceAbove > tooltipRect.height + 8;

    setPlaceAbove(shouldPlaceAbove);
  }, [showTooltip]);

  return (
    <div className="col-start-1 row-span-2 row-start-1 select-none sm:p-8 md:p-4 bg-base-200 l2 col-span-full lg:col-span-8 md:row-span-1 lg:row-span-full rounded-xl">
      {/* Title */}
      <p className="text-xl subpixel-antialiased sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bungee3d">
        Win or Witness Other&apos;s Win{" "}
        <span className="inline text-red-700 sm:block md:inline lg:block">
          NO DRAW
        </span>
      </p>

      {/* Rules */}
      <p className="my-4 text-sm lg:my-6 2xl:my-10 sm:text-base md:text-2xl lg:text-3xl 2xl:text-4xl sm:my-2 md:my-5 font-ox">
        You always have <span className="font-bold text-primary">3 marks</span>{" "}
        to play with.
        <br className="hidden sm:block lg:m-4" />
        Placing a new mark removes your{" "}
        <span
          ref={triggerRef}
          className="relative inline-block font-bold cursor-pointer text-primary"
          onClick={toggleTooltip}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          oldest
          {/* Floating Tooltip Bubble */}
          <span
            ref={tooltipRef}
            className={clsx(
              "absolute left-1/2",
              placeAbove ? "bottom-full mb-2" : "top-full mt-2",
              shift,
              "px-3 py-2 rounded-lg bg-base-300 shadow-xl border border-base-200",
              "text-xs md:text-sm whitespace-nowrap z-50",
              "transition-all duration-200 ease-out pointer-events-none",
              showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <span
              className="
                inline-block font-ox text-lg font-bold
                text-[oklch(62%_0.27_275)] dark:text-[oklch(78%_0.22_275)]
                animate-pulsate
              "
            >
              X
            </span>
            <span className="ml-2 opacity-90">= oldest mark preview</span>
          </span>
        </span>{" "}
        mark.
      </p>
    </div>
  );
};

export default GameInfo;
