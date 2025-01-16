import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import AuthContext from '../../provider/AuthContext';

import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

export default function MyModal({ item,refetch,isOpen,close,setIsOpen}) {
  const { _id, task, hour, date } = item;
  const { user } = useContext(AuthContext);

  
  const [startDate, setStartDate] = useState(new Date());
  const [updatedTask, setUpdatedTask] = useState(task); 
  const [updatedHour, setUpdatedHour] = useState(hour); 

  useEffect(() => {
    setStartDate(new Date(date)); 
  }, [date]);

  const handleUpdateTask = async (event) => {
    event.preventDefault(); 
    const taskInfo = { task: updatedTask, hour:updatedHour, date: startDate };
    console.log(taskInfo)
    try {
      const { data } = await axios.put(`http://localhost:5000/task/${_id}`, taskInfo);

      if (data) {
        refetch();
        Swal.fire({
          title: 'Updated!',
          text: 'Data updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setIsOpen(false); 
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  return (
    <>
      <Button  onClick={() => setIsOpen(true)}>  
                                 <FaEdit className="items-center" size={20}></FaEdit> 
                                  </Button>

      <Dialog open={isOpen}  as="div" className="relative z-40 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-400 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className='w-full'>
               
                <form onSubmit={handleUpdateTask} className="gap-5 mt-3 md:mx-10">
                  <label>
                    <select
                      className="w-60 md:w-80 grow"
                      value={updatedTask}
                      onChange={(e) => setUpdatedTask(e.target.value)} 
                    >
                      <option disabled>Select your task</option>
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Content</option>
                      <option>Paper-work</option>
                    </select>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-none md:max-w-xs my-4">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Working Hour"
                      value={updatedHour} 
                      onChange={(e) => setUpdatedHour(e.target.value)}
                    />
                  </label>

                  <DatePicker
                    className="input input-bordered flex items-center gap-2 w-60 md:w-80"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} 
                  />
                  <button type="submit" className='bg-lime-500 w-60 md:w-80 mt-2 rounded-md py-3 text-white'>
                    UPDATE
                  </button>

                </form>
                <button onClick={() => setIsOpen(false)} type="submit" className='bg-blue-500 w-60 md:w-80 mt-2 rounded-md py-3 text-white md:mx-10'>
                    CANCEL
                  </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
