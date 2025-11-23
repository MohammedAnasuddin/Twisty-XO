
import { Outlet } from 'react-router'
import Header from "../../../widgets/header/ui/Header.jsx";
const Home = ()=>{
    

    return(
        <div className="flex flex-col w-full min-h-screen gap-4 size-grid bg-base-100">
            <Header />
            <Outlet />
        </div>

    )
}

export default Home;