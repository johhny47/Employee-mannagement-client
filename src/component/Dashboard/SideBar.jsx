import { useState, useContext } from "react";
import AuthContext from "../../provider/AuthContext";
import { NavLink } from "react-router-dom";
import { FaHistory, FaHome, FaPaypal, FaSignOutAlt } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { Dropdown } from "flowbite-react";
import useAdmin from "../../hook/useAdmin";
import useHr from "../../hook/useHr";
import useEmployee from "../../hook/useEmployee";
import { FaBarsProgress, FaMessage, FaPeopleGroup } from "react-icons/fa6";
import { FcDataSheet } from "react-icons/fc";
import logo from "../../assets/resourcer-logo-inv.png";
import { GiHamburgerMenu } from "react-icons/gi";
const SideBar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isHr] = useHr();
  const [isEmployee] = useEmployee();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const link = (
    <>
      <div className="hidden lg:block">
        <div>
          <img src={logo} className="h-10" alt="" />
        </div>
        <div className="flex items-center space-x-6 my-5">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="h-20 w-20 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold ">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className=" mt-1">
              <strong>Since:</strong> {new Date(user?.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <NavLink to="/">
        <li>
          <a className="flex items-center gap-2">
            <FaHome /> Home
          </a>
        </li>
      </NavLink>
      {isAdmin ? (
        <div>
          <NavLink to="allemployeelist">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FaPeopleGroup /> ALL Employee List
              </a>
            </li>
          </NavLink>
          <NavLink to="payroll">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FaPaypal /> Payroll
              </a>
            </li>
          </NavLink>
          <NavLink to="message">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FaMessage /> Message
              </a>
            </li>
          </NavLink>
        </div>
      ) : null}

      {isHr ? (
        <div>
          <NavLink to="employeelist">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FaPeopleGroup /> Employee List
              </a>
            </li>
          </NavLink>
          <NavLink to="progress">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FaBarsProgress /> Progress
              </a>
            </li>
          </NavLink>
        </div>
      ) : null}

      {isEmployee ? (
        <div>
          <NavLink to="worksheet">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FcDataSheet /> Work Sheet
              </a>
            </li>
          </NavLink>
          <NavLink to="paymenthistory">
            <li className="mt-5">
              <a className="flex items-center gap-2">
                <FaHistory /> Payment History
              </a>
            </li>
          </NavLink>
        </div>
      ) : null}

      {/* Logout */}
      <div className="text-[#E02424] font-bold">
        <NavLink to="/">
          <li className="mt-5">
            <a onClick={handleLogout} className="flex items-center gap-1">
              <FaSignOutAlt className="rotate-180" />
              Logout
            </a>
          </li>
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      {/* Small Screen Navbar */}
      <button
        onClick={toggleDropdown}
        className="text-black p-3 block md:hidden"
        type="button"
      >
        <GiHamburgerMenu />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="z-1000 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2 mx-2 pl-2">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
           {link}
          </ul>
          <div className="py-2">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Separated link
            </a>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="bg-indigo-700 font-bold text-white min-h-screen lg:w-80 hidden md:block lg:block">
        <div className="px-10 mt-10">
          <ul>{link}</ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
