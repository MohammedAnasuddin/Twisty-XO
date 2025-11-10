import {useState} from "react"
import { Link } from "react-router"
import { GameProvider } from "./context/GameContext"
import Header from "./Header.jsx"
import GameBody from "../pages/GameBody.jsx"
const Entry = ()=>{
    const [playersConfig,setPlayersConfig] = useState([])
    

    return (
        
      <div className="flex h-screen w-screen  flex-col gap-8">
        <div className="l1 h-1/16 w-full ">
          
        </div>
         <GameBody/>
    </div>




    // <div id="page_wrapper" className="bg-red-300 container mx-auto px-4flex flex-col gap-6 ">

    // </div>


   
        // <div className="  flex items-center flex-col justify-center">
        // <h1 className="font-semibold  text-7xl">Welcome to Twisty-XO </h1>
        // <h3 className="  text-4xl">How will you like to play</h3>
        // <div className="flex flex-row m-6"> 

        // <Link to="/vsComputer">  
        // <button className=" font-semibold bg-blue-600 text-white m-2 p-2 w-content h-4vh rounded-sm "> vs Computer </button>
        // </Link>
        // <Link to="/vsFriend"> 
        // <button className=" font-semibold bg-yellow-500 text-white m-2 p-2 w-6vw h-4vh rounded-sm" > vs Friend </button>
        // </Link>
        // </div>
        // </div>
      
    )
}

export default Entry;