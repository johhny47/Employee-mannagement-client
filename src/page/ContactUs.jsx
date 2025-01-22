
import React, { useState } from "react";
import useAxiousPublic from "../hook/useAxiousPublic";
import Swal from "sweetalert2";
import { Helmet} from 'react-helmet-async';

const ContactUs = () => {

    const  axiosPublic = useAxiousPublic()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target
    const email=form.email.value
    const message=form.message.value
    const messageInfo= {email,message}
    console.log(messageInfo);

   
      try{
        axiosPublic.post('/message',messageInfo)
        .then(res=>{
          console.log(res.data)
          if(res.data.insertedId){
                 
            Swal.fire({
                         title: 'Successful!',
                         text: 'message sent successfuly',
                         icon: 'success',
                         confirmButtonText: 'ok'
                       })
                       navigate('/login')
         }
       })
      }catch(err) {
              console.log(err)
              Swal.fire({
                           title: 'Error!',
                           text: `${err.message}`,
                           icon: 'error',
                           confirmButtonText: 'ok'
                         })
    
                        
            }
    
    
    
  
  };

  return (

    <div className="md:flex justify-around items-center p-8">
       <Helmet>
        <title>Contact_us</title>
      
          </Helmet>

     <div>
     <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

  
         <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Our Company</h2>
          <p className="text-gray-700">
            1234 Main Street, Suite 567 <br />
             Cityville, ST 12345 <br />
              Email:john@gmail.com <br />
              Phone:01718764842
             </p>
            </div>
     </div>

    
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Send us your message</h2>

    <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

        
          <div className="mb-4">
            <label className="block text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-2 w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

       
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
