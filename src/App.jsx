
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
      element: <Entry/>,
      children: [
        // {
        //   path: "/",
        //   element:<Entry/>
        // },
         {
          path: ":mode",
          element:(
          <GameProvider>
          <Game/>
          </GameProvider>

        )
        },
        {
          path:"/Game",
          element:<h1 className="text-4xl animate-pulse">Building the Game Stay Tuned...</h1>,
          errorElement : <h1 className="text-2xl ">Building the Game Stay Tuned...</h1>
        }

      ]
    }
  ])








  return (
  
    <div className="w-full min-h-screen project-container bg-base-100">
    {/* <Header/> */}
   <RouterProvider router={projectRouter} />
    </div>
  )
}

export default App
