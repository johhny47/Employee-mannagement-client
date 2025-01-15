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
      const { data } = await axiosPublic.get(`/task/search?userEmail=${employeeEmail}`);
      return data;
    }
  });

 
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    const hour = form.hour.value;
    const date = startDate;
    const employeeEmail = user?.email;
    const taskInfo = { task, hour, date, employeeEmail };

    try {
      const res = await axios.post('http://localhost:5000/task', taskInfo);
      

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
          const res = await axiosPublic.delete(`http://localhost:5000/task/${item._id}`);
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
      <h1 className="text-center text-3xl font-bold">Work Sheet</h1>

      {/* Form */}
      <div>
        <form onSubmit={handleSubmit} className="md:flex gap-5 mt-10">
          <label className="form-control w-full max-w-xs">
            <select className="select select-bordered" name='task'>
              <option disabled selected>Select your task</option>
              <option>Sales</option>
              <option>Support</option>
              <option>Content</option>
              <option>Paper-work</option>
            </select>
          </label>
          <label className="input input-bordered flex items-center gap-2 border-none">
            <input type="text" name="hour" className="grow" placeholder="Working Hour" />
          </label>

          <DatePicker
            className="input input-bordered flex items-center gap-2"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <button className='bg-lime-500 w-full rounded-md py-3 text-white'>ADD</button>
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
          
                <Table.Cell>{item.task}</Table.Cell>
                <Table.Cell>{item.hour}</Table.Cell>
                <Table.Cell>{item.date.split('T')[0]}</Table.Cell>
                <Table.Cell><button onClick={() => handleDelete(item)}><FaTrash className="text-red-500"></FaTrash></button></Table.Cell>
                <Table.Cell>
              
                <FaEdit className="pt-2 items-center" size={20}></FaEdit> 
              <MyModal  onClick={() => setIsOpen(true)}  close={close} isOpen={isOpen} item={item}  refetch={refetch} setIsOpen={setIsOpen} ></MyModal> 
                

            
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



        
        
        
       
       
        
         
            
       
      
     