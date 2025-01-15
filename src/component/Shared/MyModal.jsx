import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import AuthContext from '../../provider/AuthContext';
import { FaPen } from 'react-icons/fa';
import axios from 'axios';

export default function MyModal({ item,refetch }) {
  const { _id, task, hour, date } = item;
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(true);
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

  const close = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <FaPen className=' text-green-400' />
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-400 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className='w-full'>
               
                <form onSubmit={handleUpdateTask} className="gap-5 mt-3">
                  <label className="form-control  max-w-xs">
                    <select
                      className="select select-bordered"
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
                  <label className="input input-bordered flex items-center gap-2 border-none max-w-xs my-4">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Working Hour"
                      value={updatedHour} 
                      onChange={(e) => setUpdatedHour(e.target.value)}
                    />
                  </label>

                  <DatePicker
                    className="input input-bordered flex items-center gap-2 w-80"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} 
                  />
                  <button type="submit" className='bg-lime-500 w-80 mt-2 rounded-md py-3 text-white'>
                    UPDATE
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
