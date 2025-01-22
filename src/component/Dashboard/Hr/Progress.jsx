import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet} from 'react-helmet-async';
const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const { data: myData, refetch,isLoading,isError,error } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axiosSecure('/alltask');
      return data;
    }
  });


  const employees = myData?.map(item => item.employeeName).filter((value, index, self) => self.indexOf(value) === index);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredData = myData?.filter(item => {
    let isEmployeeMatch = selectedEmployee ? item.employeeName === selectedEmployee : true;
    let isMonthMatch = selectedMonth ? item.date?.split('T')[0].split('-')[1] === selectedMonth : true;
    return isEmployeeMatch && isMonthMatch;
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (myData?.length === 0) {
    return <div>No progress found</div> 
  }

  return (
    <div>
      <Helmet>
        <title>Progress</title>
      
          </Helmet>
      <h1 className="text-center text-3xl font-bold mt-10 text-[#1E429F]">Progress</h1>
      
      <div className="flex justify-between mt-10">
    <div className="w-1/3">
          <Select onChange={handleEmployeeChange} value={selectedEmployee}>
            <option value="">Select Employee</option>
            {employees?.map((employee, index) => (
              <option key={index} value={employee}>
                {employee}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select onChange={handleMonthChange} value={selectedMonth}>
            <option value="">Select Month</option>
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-10">
        <Table>
          <Table.Head>
            <Table.HeadCell>Task</Table.HeadCell>
            <Table.HeadCell>Employee</Table.HeadCell>
            <Table.HeadCell>Hour</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            { filteredData?.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                <Table.Cell>{item?.task}</Table.Cell>
                <Table.Cell>{item?.employeeName}</Table.Cell>
                <Table.Cell>{item?.hour}</Table.Cell>
                <Table.Cell>{item?.date?.split('T')[0]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Progress;
