import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import AuthContext from '../../../provider/AuthContext';
import useAxiosSecure from '../../../hook/useAxiosSecure';

export default function AdminPay({ item, refetch, isOpen, close, setIsOpen }) {
  const axiosSecure = useAxiosSecure();
  const { _id, email, name, salary, Verified, img_url } = item;
  const { user } = useContext(AuthContext);
 

  const handlePay = async (event) => {
    event.preventDefault();
    const form = event.target;
    const salary = form.salary.value; 
    // const month = form.month.value;
    // const year = form.year.value;
    // const employee_id = _id;
    // const employee_name = name;
    // const employee_email = email;
    // const employeePhoto = img_url;
    // const status = 'Pending';

    const taskInfo = { salary };
    console.log(taskInfo);

    try {
    //   const { data } = await axiosSecure.post("/pay", taskInfo);

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
    <div>
      <div className='mt-5'>
        {
          Verified === 'verified' ?
            <Button className="font-bold ml-7 text-green-500" onClick={() => setIsOpen(true)}>
              Pay
            </Button>
            :
            <Button className="font-bold ml-7 text-red-500" disabled>
              Pay
            </Button>
        }
      </div>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-[#3F83F8] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className='w-full'>
                <form onSubmit={handlePay} className="gap-5 mt-3 md:mx-10">
                  <label className="input input-bordered flex items-center gap-2 border-none max-w-xs my-4">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Salary"
                      defaultValue={salary} 
                      readOnly
                      name="salary"
                    />
                  </label>
                  <div className=''>
                    <button type="submit" className='bg-[#84E1BC] font-bold w-24 md:w-60  mt-2 rounded-md py-2 text-white'>
                      PAY
                    </button>
                  
                  </div>
                </form>
                <button onClick={() => setIsOpen(false)} className='bg-red-400 font-bold w-24 mt-2 md:w-60  rounded-md py-2 mx-10 text-gray-50 md:mx-10'>
                  CANCEL
                </button>
                
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
