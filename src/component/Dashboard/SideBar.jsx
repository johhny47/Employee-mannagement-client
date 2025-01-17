import { useContext } from "react"
import AuthContext from "../../provider/AuthContext"
import { NavLink } from "react-router-dom"
import { FaBaby, FaBars, FaSignOutAlt } from "react-icons/fa"
import { Dropdown } from "flowbite-react";



const SideBar = () => {
  const {user,handleLogout} =useContext(AuthContext)
  const link = <>
  <NavLink to="/"> <li><a>Home</a></li></NavLink>

  {/* Employee */}
    <div>
    <NavLink to="worksheet"> <li><a>Work Sheet</a></li></NavLink>
    <NavLink to="paymenthistory"> <li><a>Payment History</a></li></NavLink>
    </div>
    {/* Hr */}
    <div>
    <NavLink to="employeelist"> <li><a>Employee List</a></li></NavLink>
    <NavLink to="progress"> <li><a>Progress</a></li></NavLink>
    </div>
     {/* Admin */}
     <div>
    <NavLink to="allemployeelist"> <li><a>ALL Employee List</a></li></NavLink>
    <NavLink to="payroll"> <li><a>Payroll</a></li></NavLink>
    </div>
  
  <div className="">
   
  <NavLink to="/"><li><a onClick={handleLogout} className="flex items-center gap-1">  <FaSignOutAlt className=""></FaSignOutAlt>Logout</a></li></NavLink>
 
  </div>
  
  </>

  return (
    <>
      {/* Small Screen Navbar  */}
     <div className='bg-gray-100 text-gray-800 flex justify-between   md:hidden'>
       
     <div className=" w-52">
     <Dropdown label={<FaBaby></FaBaby>} dismissOnClick={false}>
      {link}
      
    </Dropdown>
    </div>
        
      </div>

      {/* Sidebar */}
      <div  className="bg-[#76A9FA] font-bold text-white h-screen  lg:w-80 hidden  md:block lg:block">
        <div className="px-10">
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