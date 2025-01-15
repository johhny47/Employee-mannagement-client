import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import { useContext } from "react";


const Navbar = () => {
  const {user,handleLogout} =useContext(AuthContext)
    const link = <>
    <NavLink to="/"> <li><a>Home</a></li></NavLink>
    <NavLink to="/dashboard"> <li><a>DashBoard</a></li></NavLink>
    <NavLink to="/register"> <li><a>Registration</a></li></NavLink>
    <NavLink to="/"><li><a onClick={handleLogout}>Logout</a></li></NavLink>
    </>
    
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
             {link}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {link}
          </ul>
        </div>
        <div className="navbar-end">
        { user &&  <button className="mx-2">
        <img src= {user?.photoURL} alt="" className="h-10 w-10 rounded-full border-2 border-red-500 " />
        </button>}
        </div>
      </div>
    );
};

export default Navbar;