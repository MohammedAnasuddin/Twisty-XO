import {useState} from "react"
import { Link } from "react-router"
import { GameProvider } from "./context/GameContext"
import Header from "./Header.jsx"
import GameBody from "../pages/GameBody.jsx"
const Entry = ()=>{
    const [playersConfig,setPlayersConfig] = useState([])
    

    return (
        
      <div className=" grow-16 w-screen h-screen bg-base-100 md:overflow-y-hidden">
        <div className="bg-base-200 w-full l1 row-span-1 col-span-16">
          
        </div>
         <GameBody/>
    </div>




    // <div id="page_wrapper" className="container flex-col gap-6 mx-auto bg-red-300 px-4flex ">

    // </div>


   
        // <div className="flex flex-col items-center justify-center ">
        // <h1 className="font-semibold text-7xl">Welcome to Twisty-XO </h1>
        // <h3 className="text-4xl ">How will you like to play</h3>
        // <div className="flex flex-row m-6"> 

        // <Link to="/vsComputer">  
        // <button className="p-2 m-2 font-semibold text-white bg-blue-600 rounded-sm w-content h-4vh"> vs Computer </button>
        // </Link>
        // <Link to="/vsFriend"> 
        // <button className="p-2 m-2 font-semibold text-white bg-yellow-500 rounded-sm w-6vw h-4vh" > vs Friend </button>
        // </Link>
        // </div>
        // </div>
      
    )
}

export default Entry;