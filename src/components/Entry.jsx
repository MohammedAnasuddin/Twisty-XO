import {useState} from "react"
import { Link } from "react-router"
const Entry = ()=>{
    const [playersConfig,setPlayersConfig] = useState([])
 

    return (
        <div className="  flex items-center flex-col justify-center">
        <h1 className="font-semibold  text-7xl">Welcome to Twisty-XO </h1>
        <h3 className="  text-4xl">How will you like to play</h3>
        <Link to="/vsComputer/easy">  
        <button className=" font-semibold bg-blue-600 text-white m-2 p-2 w-content h-4vh rounded-sm "> vs Computer </button>
        </Link>
        
        <Link to="/vsFriend"> 
        <button className=" font-semibold bg-yellow-500 text-white m-2 p-2 w-6vw h-4vh rounded-sm" > vs Friend </button>
        </Link>
       
        </div>
    )
}

export default Entry;