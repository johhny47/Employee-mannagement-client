import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import { useContext, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
 

  const link = (
    <>
   
     <NavLink to="/"><li className="mx-6"><a >Home</a></li></NavLink>
      <NavLink to="/dashboard"><li className=""><a >DashBoard</a></li></NavLink>
      <NavLink to="/register"><li><a > Registration</a></li></NavLink>
      <NavLink to="/"><li><a onClick={handleLogout} >Logout</a></li>
    </NavLink>
    
    </>
  );

  return (
    <Navbar fluid rounded className="">
        <Navbar.Brand>
       
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
     
      {link}
    
      </Navbar.Collapse>
    </Navbar>
   
  );
};

export default Header;
