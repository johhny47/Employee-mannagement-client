import React from "react";

const EmployeeOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-4">Employee Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Employees</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Verified Employees</h3>
          <p className="text-2xl font-bold">2</p>
        </div>
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Unverified Employees</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
