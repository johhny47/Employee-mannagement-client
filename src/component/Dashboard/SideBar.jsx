import { useContext } from "react"
import AuthContext from "../../provider/AuthContext"
import { NavLink } from "react-router-dom"
import {  FaHistory, FaHome, FaPaypal, FaSignOutAlt } from "react-icons/fa"
import { BsMenuButtonWideFill } from "react-icons/bs"
import { Dropdown } from "flowbite-react";
import useAdmin from "../../hook/useAdmin";
import useHr from "../../hook/useHr";
import useEmployee from "../../hook/useEmployee";
import { FaBarsProgress, FaMessage, FaPeopleGroup } from "react-icons/fa6";
import { FcDataSheet } from "react-icons/fc";



const SideBar = () => {
  const {user,handleLogout} =useContext(AuthContext)
   const [isAdmin] = useAdmin()
   const [isHr]=useHr()
   const [isEmployee]=useEmployee()
   console.log(isAdmin);
   const link = (
    <>
      <NavLink to="/">
        <li><a className="flex items-center gap-2"><FaHome></FaHome> Home</a></li>
      </NavLink>
      {isAdmin ? (
  <div>
    <NavLink to="allemployeelist">
      <li className="mt-5"><a className="flex items-center gap-2"> <FaPeopleGroup></FaPeopleGroup> ALL Employee List</a></li>
    </NavLink>
    <NavLink to="payroll">
      <li className="mt-5"><a className="flex items-center gap-2"><FaPaypal></FaPaypal> Payroll</a></li>
    </NavLink>
    <NavLink to="message">
      <li className="mt-5"><a className="flex items-center gap-2"><FaMessage></FaMessage> Message</a></li>
    </NavLink>
  </div>
) : null}

{isHr ? (
  <div>
    <NavLink to="employeelist">
      <li className="mt-5"><a className="flex items-center gap-2"><FaPeopleGroup></FaPeopleGroup> Employee List</a></li>
    </NavLink>
    <NavLink to="progress">
      <li className="mt-5"><a className="flex items-center gap-2"><FaBarsProgress></FaBarsProgress> Progress</a></li>
    </NavLink>
  </div>
) : null}

{isEmployee ? (
  <div>
    <NavLink to="worksheet">
      <li className="mt-5"><a className="flex items-center gap-2"><FcDataSheet></FcDataSheet> Work Sheet</a></li>
    </NavLink>
    <NavLink to="paymenthistory">
      <li className="mt-5"><a className="flex items-center gap-2"><FaHistory></FaHistory> Payment History</a></li>
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
      {/* Small Screen Navbar  */}
     <div className='bg-gray-100 text-gray-800  md:hidden'>
       
     <div className=" flex justify-between w-52">
     <Dropdown label={<BsMenuButtonWideFill />} dismissOnClick={false}>
      {link}
      
    </Dropdown>
    </div>
        
      </div>

      {/* Sidebar */}
      <div  className="bg-[#1A56DB] font-bold text-white min-h-screen   lg:w-80 hidden  md:block lg:block">
        <div className="px-10 mt-10">
        <ul >
          {link}
        </ul>
        </div>
      </div>
     
    </>
  )
}

export default SideBar


