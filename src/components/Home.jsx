
import { Outlet } from 'react-router'
import Header from "./Header.jsx";
const Home = ()=>{
    

    return(
        <div className="w-full min-h-screen size-grid flex gap-4 flex-col bg-base-100">
            <Header />
            <Outlet />
        </div>

    )
}

export default Home;