
import { Outlet } from 'react-router'
import Header from "./Header.jsx";
const Home = ()=>{
    

    return(
        <div className="mx-4 grid grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12">
            <Header/>
            <Outlet/>
        </div>

    )
}

export default Home;