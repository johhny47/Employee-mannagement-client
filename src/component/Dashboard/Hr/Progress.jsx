import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";


const Progress = () => {
  const axiosSecure = useAxiosSecure() 
  const { data:myData, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axiosSecure('/alltask');
      return data;
    }
  });
 

  return (
    <div>
      <h1 className=" text-center text-3xl font-bold mt-10 text-[#1E429F]">Progress</h1>
    
      <div className="overflow-x-auto mt-10">
        <Table>
          <Table.Head>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Hour</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
           
          </Table.Head>

          <Table.Body className="divide-y">
            {myData?.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                   <Table.Cell>{item.task}</Table.Cell>
                   <Table.Cell>{item.hour}</Table.Cell>
                   <Table.Cell>{item.date?.split('T')[0]}</Table.Cell>
                
               
         </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default  Progress;
