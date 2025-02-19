import { useContext } from "react";
import AuthContext from "../../provider/AuthContext";
import { Helmet } from "react-helmet-async";
import { FaSignOutAlt } from "react-icons/fa";

const DashBoardHome = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-100">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

    

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-indigo-800">User Profile</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded-md flex items-center hover:bg-red-400"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <img
              src={user?.photoURL}
              alt="User Avatar"
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-indigo-700">
                {user?.displayName || "Anonymous User"}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Email:</strong> {user?.email || "Not Provided"}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Member Since:</strong> {new Date(user?.metadata.creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
