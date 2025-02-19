import { useContext } from "react";
import AuthContext from "../../provider/AuthContext";
import { Helmet } from "react-helmet-async";
import { FaSignOutAlt } from "react-icons/fa";
import EmployeeOverview from "./DashboardContent/EmployeeOverview";

const DashBoardHome = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-100">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

    

      {/* Main Content */}
      
    <div className="mt-20 w-full">
    <EmployeeOverview></EmployeeOverview>
    </div>
  </div>



  );
};

export default DashBoardHome;
