import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import { useContext, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FaHome, FaPhone, FaRegistered, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import logo from "../../assets/resourcer-logo-inv.png"

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
 
  console.log(user);
  const link = (
    <>
    {
      user? <div className="md:flex gap-4"><NavLink to="/"><li><a className="flex items-center gap-1"><FaHome></FaHome>Home</a></li></NavLink>
      <NavLink to="/dashboard"><li><a className="flex items-center gap-1"><RxDashboard/> DashBoard</a></li></NavLink>
      <NavLink to="/contact"><li ><a className="flex items-center gap-1 "><FaPhone className="rotate-90"></FaPhone>Contact Us</a></li></NavLink>
      <li className="md:hidden block"><NavLink to="/"><li ><a className="flex items-center gap-1 " onClick={handleLogout} ><FaSignOutAlt className="rotate-180" ></FaSignOutAlt>Logout </a></li>  </NavLink></li>
     
      </div> :<div className="md:flex gap-4"> <NavLink to="/"><li><a className="flex items-center gap-1"><FaHome></FaHome>Home</a></li></NavLink>
      <NavLink to="/dashboard"><li className=""><a  >DashBoard</a></li></NavLink>
      <NavLink to="/contact"><li className=""><a >Contact Us</a></li></NavLink>
      <NavLink to="/register"><li><a className="flex items-center gap-1"><FaRegistered></FaRegistered>  Registration</a></li></NavLink>
      <NavLink to="/login"><li><a className="flex items-center gap-1"> <FaSignInAlt></FaSignInAlt> Login</a></li></NavLink>

      </div>
    }
    
     
     
  
    
    </>
  );

  return (
   <div className="fixed z-50 top-0 w-full">
     <Navbar fluid rounded className="bg-[#1E429F] text-white max-w-7xl">
        <Navbar.Brand>
        <Navbar.Toggle  />
        <img src={logo} className="h-10 ml-2 md:ml-0" alt="" />
      
      </Navbar.Brand>
      
     {
      user ?  <div className="flex md:order-2 gap-4 items-center">   <ul className="hidden md:block"><NavLink to="/"><li ><a className="flex items-center gap-2" onClick={handleLogout} ><h1>Logout</h1> <FaSignOutAlt ></FaSignOutAlt></a></li>  </NavLink></ul>
      <Avatar alt="User settings"  img={user?.photoURL} rounded /></div> : <div></div>
     
      
     }
     
        
      <Navbar.Collapse className="bg-slate-50 md:bg-transparent text-black md:text-white px-2 mt-2 rounded-lg">
     
      {link}
      
      </Navbar.Collapse>
    
    </Navbar>
   </div>
   
  );
};

export default Header;
