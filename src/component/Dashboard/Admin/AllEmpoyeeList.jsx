import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";


const  AllEmpoyeeList = () => {
  const  axiosSecure = useAxiosSecure();
    
  const { data:myData, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axiosSecure('/allemployeelist');
      return data;
    }
  });
  const handleMakeHr = (item) => {
    axiosSecure.patch(`/makehr/${item._id}`).then(res => {
       console.log(res.data);
     
       if (res.data.modifiedCount > 0) {
         refetch(); 
       
                
       }
     })
   };
   const handleFire = async (item) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Fire Employee!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/fire/${item._id}`)
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted',
              text: 'Task deleted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className=" text-center text-3xl font-bold mt-10 text-[#1E429F]">All Employee List</h1>
    
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
              <Table.Row className="bg-white font-bold dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.designation}</Table.Cell>
                <button className="ml-7 my-2" onClick={() => handleMakeHr(item)}>
                      {item.role}
                      </button> 
               <Table.Cell><button onClick={() => handleFire(item)}>{item.fire?"Fired":"Fire"}</button></Table.Cell>
                
              
         </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default  AllEmpoyeeList;
