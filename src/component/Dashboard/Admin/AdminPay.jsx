import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import AuthContext from '../../../provider/AuthContext';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import CheckoutForm from '../../Shared/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
export default function AdminPay({ item, refetch, isOpen, close, setIsOpen }) {
  const axiosSecure = useAxiosSecure();
  const { _id, email, name, salary, Verified, img_url,status } = item;
  const { user } = useContext(AuthContext);
 

 
  

  return (
    <div>
       
      <div className='-mx-10'>
        {
          status === 'paid' ?
            <Button className="font-bold ml-7  text-red-500" disabled >
              Paid
            </Button>
            :
            <Button className="font-bold ml-7 text-green-500" onClick={() => setIsOpen(true)} >
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
                
                 <Elements stripe={stripePromise}>
                 
                  <CheckoutForm
                 
                 setIsOpen={setIsOpen}
                 item={item} 
                 refetch={refetch}
                   
                  />
                </Elements>
               
               
                
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
