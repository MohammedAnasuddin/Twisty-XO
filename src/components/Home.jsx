
import { Outlet } from 'react-router'
import Header from "./Header.jsx";
const Home = ()=>{
    

    return(
        <div>
            <Header/>
            <Outlet/>
        </div>

    )
}

export default Home;