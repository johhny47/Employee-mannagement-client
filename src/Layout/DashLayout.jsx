import { Outlet } from "react-router-dom";
import SideBar from "../component/Dashboard/SideBar";
import { Toaster } from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";


const DashLayout = () => {
    return (
        <div className='relative min-h-full md:flex bg-white'>
        <Toaster/>
        <SweetAlert2/>
        <SideBar />
    
        <div className='flex-1 md:ml-10'>
          <div className=''>
         
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashLayout;