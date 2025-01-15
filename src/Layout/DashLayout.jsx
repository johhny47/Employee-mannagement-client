import { Outlet } from "react-router-dom";
import SideBar from "../component/Dashboard/SideBar";


const DashLayout = () => {
    return (
        <div className='relative min-h-screen md:flex bg-white'>
       
        <SideBar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className='flex-1  md:ml-64'>
          <div className='p-5'>
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashLayout;