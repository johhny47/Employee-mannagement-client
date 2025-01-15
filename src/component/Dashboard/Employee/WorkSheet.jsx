
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../../Shared/Table";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAxiousPublic from "../../../hook/useAxiousPublic";
import { axiosPublic } from './../../../hook/useAxiousPublic';
import axios from "axios";
import AuthContext from "../../../provider/AuthContext";
const WorkSheet = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiousPublic()
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target
        const task = form.task.value
        const hour = form.hour.value
        const date = startDate
        const employeeEmail = user?.email
        const taskInfo = {task,hour,date,employeeEmail}
        console.log(taskInfo)

        try {
          
            axios.post('http://localhost:5000/task',taskInfo)
             .then(res=>{
              console.log(res);
             })}
         catch (error) {
            console.error(error);
         }
    }
      
     
         

      
       
    
      

  
    return (
        <div>
            <h1 className="text-center text-3xl font-bold ">Work Sheet</h1>
           {/* form */}
           <div>
            <form onSubmit={handleSubmit} className="md:flex gap-5 mt-10">
            <label className="form-control w-full max-w-xs -mt-4 ">
      <div className="label">
      </div>
     <select className="select select-bordered" name='task'>
     <option disabled selected>Select your task</option>
     <option>Sales</option>
     <option>Support</option>
     <option>Content</option>
     <option>Paper-work</option>
     </select>
      </label>
      <label className="input input-bordered flex items-center gap-2 ">
 
     <input type="text"  name="hour" className="grow" placeholder="Working Hour" />
</label>

   <DatePicker className="input input-bordered flex items-center gap-2 " selected={startDate} onChange={(date) => setStartDate(date)} />
         <button className='bg-lime-500 w-full rounded-md  py-3 text-white'>ADD</button>
            </form>
           </div>
           {/* table */}
           <div className="overflow-x-auto mt-10">
        <table className="table">
        {/* head */}
        <thead>
          <tr>
          
          <th>Task</th>
          <th>Hour</th>
          <th>Date</th>
           <th>Delete</th>
           <th>Update</th>

          </tr>
        </thead>
        {/* <tbody> */}
          {/* row 1 */}
          {/* {
           myData.map((data,idx) => <tr className="bg-base-200">
                 <th>{idx+1}</th>
                <td>{data.productName}</td>
                <td>{data.userEmail}</td>
             
                <td>{data.recomReason}</td>
                <td className="badge badge-outline"> <button onClick={()=>handleDelete(data._id)}>Delete</button></td>
              </tr>)
          }
        
        </tbody> */}
      </table>
    </div>
        </div>
    );
};

export default WorkSheet;