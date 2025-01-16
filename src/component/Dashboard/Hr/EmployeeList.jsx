import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Pay from "./Pay";

const EmployeeList = () => {
     let [isOpen, setIsOpen] = useState(false) 
  const { data, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axios('http://localhost:5000/employee_list');
      return data;
    }
  });

  const handleVerified = (item) => {
   axios.patch(`http://localhost:5000/employee/verify/${item._id}`).then(res => {
      console.log(res.data);
    
      if (res.data.modifiedCount > 0) {
        
         Swal.fire({
                  title: 'Task Added',
                  text: 'Your task has been added successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                refetch(); 
      }
    })
  };

  const handleRemoveVerified = (item) => {
    console.log("Rveri");

    axios.patch(`http://localhost:5000/employee/removeVerify/${item._id}`).then(res => {
      console.log(res.data);

    if (res.data.modifiedCount > 0) {
       
         Swal.fire({
                  title: 'Task Added',
                  text: 'Your task has been added successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }); 
                refetch();
      }
    })
  };
  const close = () => setIsOpen(false);
  return (
    <div>
      <h1>Employee List</h1>

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
            {data?.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
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
                <Table.Cell>{item.bankAccountNo}</Table.Cell>
                <Table.Cell>{item.salary}</Table.Cell>

                <button onClick={() => setIsOpen(true)} >
                <Pay  close={close} isOpen={isOpen} item={item}  refetch={refetch} setIsOpen={setIsOpen} ></Pay> 
                </button>

                <Table.Cell>{item._id}</Table.Cell>


              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeList;
