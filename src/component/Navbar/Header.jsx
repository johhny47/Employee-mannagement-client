import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import { useContext, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
 
  console.log(user);
  const link = (
    <>
   
     <NavLink to="/"><li><a >Home</a></li></NavLink>
      <NavLink to="/dashboard"><li className=""><a >DashBoard</a></li></NavLink>
      <NavLink to="/register"><li><a > Registration</a></li></NavLink>
      <NavLink to="/"><li><a onClick={handleLogout} >Logout</a></li>
    </NavLink>
    
    </>
  );

  return (
    <Navbar fluid rounded >
        <Navbar.Brand>
        <Navbar.Toggle />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-4 items-center">

      <h1>{user.displayName}</h1>
      <Avatar alt="User settings"  img={user?.photoURL} rounded />
          
       
      </div>
      <Navbar.Collapse>
     
      {link}
      
      </Navbar.Collapse>
    
    </Navbar>
   
  );
};

export default Header;
