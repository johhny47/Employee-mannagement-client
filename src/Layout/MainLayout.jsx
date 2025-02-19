import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Header";
import { Toaster } from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";
import Header from "../component/Navbar/Header";
import Footer from "../component/Footer/Footer";
import FeaturesSection from "../component/HomeComponent/ExtraSection/FeaturesSection";


const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Toaster/>
            <SweetAlert2/>
            <Header></Header>
           
            <div className="min-h-[calc(100vh-273px)] w-full mx-auto">
            <Outlet></Outlet>
            </div>
           
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;