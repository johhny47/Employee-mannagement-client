import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import AuthContext from '../../../provider/AuthContext';

export default function Pay({ item,refetch,isOpen,close,setIsOpen}) {
  const { _id,email,name, salary,Verified } = item;
  const { user } = useContext(AuthContext);
  const [updatedSalary, setUpdatedSalary] = useState( salary);
  
 
  const handlePay = async (event) => {
    event.preventDefault(); 
    const form = event.target
    const month =form.month.value
    const year =form.year.value
    const employee_id = _id
    const employee_name = name
    const employee_email = email  
    const status= "Pending"
    
   
  

    const taskInfo = {salary:updatedSalary,month,year,employee_id,employee_name,employee_email,status,Verified};
    console.log(taskInfo)
    try {
      const { data } = await axios.post("http://localhost:5000/pay", taskInfo);

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
             <Button className="font-bold ml-7 text-green-500"  onClick={() => setIsOpen(true)}>  
             Pay
              </Button>
                                : 
                                <Button className="font-bold ml-7 text-red-500" disabled >  
                                Pay
                                 </Button>
                            }
          </div>
             
        
              <Dialog open={isOpen}  as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                      transition
                      className="w-full max-w-md rounded-xl 
                      bg-[#3F83F8] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                      <div className='w-full'>
                       
                        <form onSubmit={handlePay}  className="gap-5 mt-3 md:mx-10">
                        <label className="input input-bordered flex items-center gap-2 border-none max-w-xs my-4">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Salary"
                      value={updatedSalary} 
                      onChange={(e) =>setUpdatedSalary(e.target.value)}
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-none max-w-xs my-4">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Month"
                      name="month"
                     
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-none max-w-xs my-4">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Year"
                      name="year"
                     
                    />
                  </label>
                          
        
                        
                          <button type="submit" className='bg-[#84E1BC] font-bold w-60 md:w-80 mt-2 rounded-md py-3 text-white'>
                            PAY
                          </button>
        
                        </form>
                        <button onClick={() => setIsOpen(false)} type="submit" className='bg-[#31C48D] font-bold w-60 md:w-80 mt-2 rounded-md py-3 text-white md:mx-10'>
                            CANCEL
                          </button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
        </div>
    );
};

