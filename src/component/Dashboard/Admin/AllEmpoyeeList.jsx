import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";


const  AllEmpoyeeList = () => {
    
  const { data:myData, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axios('http://localhost:5000/allemployeelist');
      return data;
    }
  });


  return (
    <div>
      <h1 className=" text-center text-3xl font-bold">Payroll</h1>
    
      <div className="overflow-x-auto mt-10">
        <Table>
          <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Designation</Table.HeadCell>
            <Table.HeadCell>Make HR</Table.HeadCell>
            <Table.HeadCell>Fire</Table.HeadCell>
           
          </Table.Head>

          <Table.Body className="divide-y">
            {myData?.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.designation}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell></Table.Cell>
                
               
         </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default  AllEmpoyeeList;
