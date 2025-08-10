
import Entry from "./components/Entry.jsx";
import './App.css'
import Home from "./components/Home"
import Header from "./components/Header.jsx"
import Grid from "./components/Grid/Grid.jsx"
import Game from "./components/Game.jsx"

import { createBrowserRouter, RouterProvider } from 'react-router'
import { GameProvider } from "./components/context/GameContext";
function App(){
  
  const projectRouter = createBrowserRouter([

    {
      path: "/",
      element: <Home/>,
      children: [
        {
          path: "/",
          element:<Entry/>
        },
         {
          path: ":mode/:level?",
          element:(
          <GameProvider>
          <Game/>
          </GameProvider>

        )
        },

      ]
    }
  ])








  return (
    <div className="project-container w-full h-full">
    {/* <Header/> */}
   <RouterProvider router={projectRouter} />
    </div>
  )
}

export default App
