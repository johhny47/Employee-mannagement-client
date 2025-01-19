import { useContext } from "react"
import AuthContext from "../../provider/AuthContext"
import { NavLink } from "react-router-dom"
import {  FaHistory, FaHome, FaPaypal, FaSignOutAlt } from "react-icons/fa"
import { BsMenuButtonWideFill } from "react-icons/bs"
import { Dropdown } from "flowbite-react";
import useAdmin from "../../hook/useAdmin";
import useHr from "../../hook/useHr";
import useEmployee from "../../hook/useEmployee";
import { FaBarsProgress, FaPeopleGroup } from "react-icons/fa6";
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


{/* <div
className={`z-40 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform 
  -translate-x-full
  md:translate-x-0  transition duration-200 ease-in-out`}
>
<div>
  <div>
    <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
     
    </div>
  </div>

  {/* Nav Items */}
//   <div className='flex flex-col justify-between flex-1 mt-6'>
//     <nav>
      
//     </nav>
//   </div>
// </div>

// <div>
//   <hr />

//   <button
 
//     className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
//   >
    {/* <GrLogout className='w-5 h-5' /> */}

//     <span className='mx-4 font-medium'>Logout</span>
//   </button>
// </div>
// </div> */}