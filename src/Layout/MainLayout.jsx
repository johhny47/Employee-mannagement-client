import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";


const MainLayout = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Toaster/>
            <SweetAlert2/>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;