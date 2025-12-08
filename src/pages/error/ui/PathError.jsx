// PathError.tsx / PathError.jsx
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const PathError = () => {
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(true); // shake once on mount

  // Stop the shake after one animation duration
  useEffect(() => {
    if (!isShaking) return;
    const timer = setTimeout(() => setIsShaking(false), 600); // matches your --animate-shake
    return () => clearTimeout(timer);
  }, [isShaking]);

  const handleUndo = () => {
    navigate("/"); // always go to home "/"
  };

  const triggerShake = () => {
    // restart the shake on hover
    setIsShaking(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-base-100 text-base-content">
      <div className="relative w-full max-w-md text-center">
        {/* Giant X + ghost O */}
        <div className="relative inline-block mb-8" onMouseEnter={triggerShake}>
          {/* Ghost O behind */}
          <span
            className="
              pointer-events-none
              absolute inset-0
              translate-x-4 translate-y-4
              text-[7rem] sm:text-[8rem] md:text-[9rem]
              leading-none
              text-gradient-o
              opacity-20
              blur-sm
              font-bungee-thin
              select-none
            "
          >
            O
          </span>

          {/* Main X – error red, shake on mount + hover */}
          <span
            className={`
              block
              text-[7rem] sm:text-[8rem] md:text-[9rem]
              leading-none
              font-bungee3d
              text-red-700
              drop-shadow-lg
              select-none
              ${isShaking ? "animate-shake" : ""}
            `}
          >
            X
          </span>
        </div>

        {/* 404 label */}
        <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-base-content/60 mb-2">
          4 0 4
        </p>

        {/* Title */}
        <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-bungee">
          Wrong move.
        </h1>

        {/* Subtitle */}
        <p className="mb-6 text-sm sm:text-base md:text-lg font-ox text-base-content/80">
          You made a move that doesn't exist.
          <br className="hidden sm:block" />
          Let's undo that and get you back into the game.
        </p>

        {/* Single Undo button */}
        <button
          onClick={handleUndo}
          className="px-6 tracking-wide rounded-full shadow-lg btn btn-primary sm:px-8 font-ox shadow-primary/30"
        >
          Undo move
        </button>
      </div>
    </div>
  );
};

export default PathError;
