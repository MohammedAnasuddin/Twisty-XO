const GameInfo = ()=>{
    return (
        <div className=" p-4 sm:p-8 bg-base-200 l2 col-start-1 col-span-full lg:col-span-8  row-start-1 row-span-2 md:row-span-2 lg:row-span-full  ">

             <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl  font-bungee3d subpixel-antialiased">Win or Witness Other's Win <p className="inline sm:block md:inline lg:block text-red-700 ">NO DRAW</p></p> 
             <p className="text-sm sm:text-base md:text-2xl lg:text-3xl 2xl:text-4xl  my-4  sm:my-2 md:my-5  font-ox ">Player's <p className="inline animate-pulse">Oldest</p> Move will be removed from 4th Move Onwards</p> 
            </div>
       
    )
}
export default GameInfo;
// min-h-5/16 h-fit md:w-1/2 md:h-full