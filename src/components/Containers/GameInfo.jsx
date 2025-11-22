const GameInfo = () => {
  return (
    <div className="col-start-1 row-span-2 row-start-1 p-4 sm:p-8 bg-base-200 l2 col-span-full lg:col-span-8 md:row-span-1 lg:row-span-full">
      <p className="text-xl subpixel-antialiased sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bungee3d">
        Win or Witness Other's Win{" "}
        <span className="inline text-red-700 sm:block md:inline lg:block ">
          NO DRAW
        </span>
      </p>
      <p className="my-4 text-sm sm:text-base md:text-2xl lg:text-3xl 2xl:text-4xl sm:my-2 md:my-5 font-ox ">
        Player's <span className="inline animate-pulse ">Oldest</span> Move will be
        removed from 4th Move Onwards
      </p>
    </div>
  );
};
export default GameInfo;
// min-h-5/16 h-fit md:w-1/2 md:h-full
