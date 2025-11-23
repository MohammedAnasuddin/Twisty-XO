import "remixicon/fonts/remixicon.css";
import Entry from "../components/Entry.jsx";
import Game from "../pages/game/ui/GamePage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import { GameProvider } from "../entities/game/model/GameContext.jsx";
function App() {
  const projectRouter = createBrowserRouter([
    {
      path: "/",
      element: <Entry />,
      children: [
        // {
        //   path: "/",
        //   element:<Entry/>
        // },
        {
          path: ":mode",
          element: (
            <GameProvider>
              <Game />
            </GameProvider>
          ),
        },
        {
          path: "/Game",
          element: (
            <h1 className="text-4xl animate-pulse">
              Building the Game Stay Tuned...
            </h1>
          ),
          errorElement: (
            <h1 className="text-2xl ">Building the Game Stay Tuned...</h1>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="w-full min-h-screen project-container bg-base-100">
      {/* <Header/> */}
      <RouterProvider router={projectRouter} />
    </div>
  );
}

export default App;
