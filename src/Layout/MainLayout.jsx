import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Header";
import { Toaster } from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";
import Header from "../component/Navbar/Header";


const MainLayout = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Toaster/>
            <SweetAlert2/>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;