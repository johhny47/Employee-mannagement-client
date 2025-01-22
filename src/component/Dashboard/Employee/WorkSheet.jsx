import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "flowbite-react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAxiousPublic from "../../../hook/useAxiousPublic";
import { axiosPublic } from './../../../hook/useAxiousPublic';
import axios from "axios";
import AuthContext from "../../../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import SweetAlert2 from "react-sweetalert2";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Button } from "@headlessui/react";
import MyModal from "../../Shared/MyModal";
import { FaEdit, FaPen, FaTrash } from "react-icons/fa";
import { Helmet} from 'react-helmet-async';
const WorkSheet = () => {
    let [isOpen, setIsOpen] = useState(false) 
  const { user } = useContext(AuthContext);
  const employeeEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiousPublic();
  const [startDate, setStartDate] = useState(new Date());

 
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['task'],
    queryFn: async () => {
      const { data } = await  axiosSecure.get(`/task/search?userEmail=${employeeEmail}`);
      return data;
    }
  });

 
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    const hour = form.hour.value;
    const date = startDate;
    const employeeName = user?.displayName;
    const employeeEmail = user?.email;
    const employeePhoto = user?.photoURL;
    const taskInfo = { task, hour, date,employeeName,employeeEmail,employeePhoto };

    try {
      const res = await  axiosSecure.post('/task', taskInfo);
      

      if (res.data) {
        refetch();
        Swal.fire({
          title: 'Task Added',
          text: 'Your task has been added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('There was an error adding your task.');
    }
  };

  // Handle task deletion
  const handleDelete = async (item) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await  axiosSecure.delete(`/task/${item._id}`);
          console.log(res.data);
          if (res.data.deletedCount > 0) {
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

  const close = () => setIsOpen(false);
  return (
    <div>
      <Helmet>
        <title>worksheet</title>
      
          </Helmet>
      <h1 className=" text-center text-3xl font-bold mt-10 text-[#1E429F]">Work Sheet</h1>

      {/* Form */}
      <div>
        <form onSubmit={handleSubmit} className="md:flex gap-20 mt-10">
          <label className="form-control w-full max-w-xs">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center gap-2 border-none grow" name='task'>
              <option disabled selected>Select your task</option>
              <option>Sales</option>
              <option>Support</option>
              <option>Content</option>
              <option>Paper-work</option>
            </select>
          </label>
          <label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center gap-2 border-none grow" type="text" name="hour"  placeholder="Working Hour" />
          </label>

          <DatePicker
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  items-center gap-2 border-none grow"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <button className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-7'>ADD</button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
      

      <Table>
      <Table.Head>
      <Table.HeadCell>Task</Table.HeadCell>
      <Table.HeadCell>Hour</Table.HeadCell>
      <Table.HeadCell>Date</Table.HeadCell>
      <Table.HeadCell>Delete</Table.HeadCell> 
      <Table.HeadCell>Update</Table.HeadCell>
             
            </Table.Head>
            <Table.Body className="divide-y">
            {data?.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
          
                <Table.Cell>{item?.task}</Table.Cell>
                <Table.Cell>{item?.hour}</Table.Cell>
                <Table.Cell>{item?.date.split('T')[0]}</Table.Cell>
                <Table.Cell><button onClick={() => handleDelete(item)}><FaTrash className="text-red-500"></FaTrash></button></Table.Cell>
                <Table.Cell>
                <button onClick={() => setIsOpen(true)} >
                <MyModal className="hidden"  close={close} isOpen={isOpen} item={item}  refetch={refetch} setIsOpen={setIsOpen} ></MyModal> 
                </button>
               
               
                
                
             
                

            
                </Table.Cell>
                
                </Table.Row>
            ))}
          </Table.Body>
          
          </Table>
        
      </div>
    </div>
  );
};

export default WorkSheet;



        
        
        
       
       
        
         
            
       
      
     