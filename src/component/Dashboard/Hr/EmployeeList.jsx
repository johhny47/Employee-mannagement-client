import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Pay from "./Pay";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet} from 'react-helmet-async';
const EmployeeList = () => {
  const  axiosSecure = useAxiosSecure();
     let [isOpen, setIsOpen] = useState(false) 
  const { data:myData, refetch,isLoading,isError,error} = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axiosSecure('/employee_list');
      return data;
    }
  });

  const handleVerified = (item) => {
    axiosSecure.patch(`/employee/verify/${item?._id}`).then(res => {
      console.log(res.data);
    
      if (res.data.modifiedCount > 0) {
        refetch(); 
        toast("Add Verify")
               
      }
    })
  };

  const handleRemoveVerified = (item) => {
   

    axiosSecure.patch(`/employee/removeVerify/${item?._id}`).then(res => {
      console.log(res.data);

    if (res.data.modifiedCount > 0) {
          refetch();
        toast("Remove Verify")
             
      }
    })
  };
  const close = () => setIsOpen(false)
 
 
  return (
    <div>
      <Helmet>
        <title>Enployee-List</title>
      
          </Helmet>
      <h1 className=" text-center text-3xl font-bold mt-10 text-[#1E429F]">Employee List</h1>

      <div className="overflow-x-auto mt-10">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Verified</Table.HeadCell>
            <Table.HeadCell>Bank Account</Table.HeadCell>
            <Table.HeadCell>Salary</Table.HeadCell>
            <Table.HeadCell>Pay</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {
               isLoading ?  <Table.Cell>Loading....</Table.Cell> :
               myData?.map(item => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                  <Table.Cell>{item?.name}</Table.Cell>
                  <Table.Cell>{item?.email}</Table.Cell>
                  <Table.Cell>
                    {
                      item?.Verified === 'verified' ? 
                        <button onClick={() => handleRemoveVerified(item)}>
                        <FaCheck className="text-green-500 text-xl" />
                        </button> 
                        : 
                        <button onClick={() => handleVerified(item)}>
                         <FaTimes className="text-red-500" size={30}></FaTimes>
                        </button>
                    }
                  </Table.Cell>
                  <Table.Cell>{item?.bankAccountNo}</Table.Cell>
                  <Table.Cell>{item?.salary}</Table.Cell>
                  
                  <button onClick={() => setIsOpen(true)} >
                  <Pay  close={close} isOpen={isOpen} item={item}  refetch={refetch} setIsOpen={setIsOpen} ></Pay> 
                  </button>
  
                  <Table.Cell> <Link to={`/details/${item?._id}`}>
                  <button>
                  Details
                  </button>
                  </Link></Table.Cell>
  
  
                </Table.Row>
              ))
               
              }
            
            
          
           
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeList;
