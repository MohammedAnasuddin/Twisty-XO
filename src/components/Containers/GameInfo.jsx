const GameInfo = ()=>{
    return (
        <div className="w-full p-4 l2 base-200 md:w-8/16 h-5/16 md:h-full">

            <p className=" lg:text-8xl text-base-content font-bungee3d">Win or Witness Other's Win <p className="inline text-red-700">NO DRAW</p></p>
            <p className="mt-6 text-4xl font-ox">Your <p className="inline animate-pulse">Oldest</p> Move will be removed from 4th Move Onwards</p>
        </div>
    )
}
export default GameInfo;