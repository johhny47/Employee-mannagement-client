import { useContext, useState } from "react";
import AuthContext from "../../provider/AuthContext";

const DashBoardHome = () => {
    const {user,handleLogout} =useContext(AuthContext)
    return (
        <div className="flex h-screen pb-10">
    
      <div className="flex-1 p-8">
         
          <div className="flex justify-between mb-8">
            <h1 className="text-3xl font-bold">USER PROFILE</h1>
            <div className="flex items-center space-x-4">
           
            </div>
          </div>

          <div>
            <img src={user?.photoURL} className="h-32" alt="" />
            <h1 className="mt-4 text-2xl font-bold">Name: <span>{user?.displayName}</span></h1>
          </div>
  
      
          </div>
        </div>
    );
};

export default DashBoardHome;