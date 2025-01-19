import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import { useContext, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
 
  console.log(user);
  const link = (
    <>
    {
      user? <div className="md:flex gap-4"> <NavLink to="/"><li><a >Home</a></li></NavLink>
      <NavLink to="/dashboard"><li className=""><a >DashBoard</a></li></NavLink>
      
     
      </div> :<div className="md:flex gap-4"> <NavLink to="/"><li><a >Home</a></li></NavLink>
      <NavLink to="/dashboard"><li className=""><a >DashBoard</a></li></NavLink>
      <NavLink to="/register"><li><a > Registration</a></li></NavLink>
      <NavLink to="/login"><li><a >Login</a></li></NavLink>
      </div>
    }
    
     
     
  
    
    </>
  );

  return (
    <Navbar fluid rounded className="bg-[#1E429F] text-white">
        <Navbar.Brand>
        <Navbar.Toggle />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      
     {
      user ?  <div className="flex md:order-2 gap-4 items-center">   <ul><NavLink to="/"><li ><a className="flex items-center gap-2" onClick={handleLogout} ><h1>Logout</h1> <FaSignOutAlt ></FaSignOutAlt></a></li>  </NavLink></ul>
      <Avatar alt="User settings"  img={user?.photoURL} rounded /></div> : <div></div>
     
      
     }
     
        
      <Navbar.Collapse>
     
      {link}
      
      </Navbar.Collapse>
    
    </Navbar>
   
  );
};

export default Header;
