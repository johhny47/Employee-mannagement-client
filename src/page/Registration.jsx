import { useContext, useState } from "react";
import AuthContext from "../provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAxiousPublic from "../hook/useAxiousPublic";
import axios from "axios";
import SocialBtn from "../component/Shared/SocialBtn";
import Swal from "sweetalert2";




const Registration = () => {
  const axiosPublic = useAxiousPublic()
  
 
  const { handleRegister, manageProfile,handleGoogleLogin,user }= useContext(AuthContext)
  
  const [error,setError] = useState("")
  const navigate=useNavigate()
    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target
        
        const email = form.email.value
        const name = form.name.value
        const password = form.password.value
        const role = form.role.value
        const salary = form.salary.value
        const bankAccountNo = form.bankaccountno.value
        const designation = form.designation.value
        const Verified = ''
        const image = form.image.files[0]
        if(password.length < 6){
          setError("is less than 6 characters")
          return;
     }
      if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
          setError("password don't have a special character")
          return;
     }
      if(!/[A-Z]/.test(password)){
          setError("password must contain at least one Uppercase")
           return;
      }
      if(error){
        setError("")
        event.target.reset()
      }
      toast(`${error}`)
         

        const formData = new FormData()
        formData.append('image', image)
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        )
        const img_url=data.data.display_url
     
        const UserInfo = {name,email,role,img_url,salary,bankAccountNo,designation,Verified}
       
    
        try {
          
          const result = await handleRegister(email,password)
    
        
          await manageProfile(name,img_url)
          
         
          axiosPublic.post('/user',UserInfo)
          .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0 || res.data.insertedId ){
             
               Swal.fire({
                            title: 'Successful!',
                            text: 'Successfully  Signin',
                            icon: 'success',
                            confirmButtonText: 'ok'
                          })
                          navigate('/login')
            }
          })
         
        } catch(err) {
          console.log(err)
          Swal.fire({
                       title: 'Error!',
                       text: `${err.message}`,
                       icon: 'error',
                       confirmButtonText: 'ok'
                     })

                    
        }

       
      }
    
     



    return (
        <div className="md:max-w-3xl mx-auto bg-[#C3DDFD]  mt-20 md:mt-10 p-5 rounded-lg">
      <h1 className="mx-20 md:mx-60 text-[#8DA2FB]  font-bold text-3xl md:text-5xl">Registration</h1>
<form onSubmit={handleSubmit} >
<div className="md:flex justify-around mt-10 md:mt-14">
<div>
<label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" name="email" className="grow" placeholder="Email" />
</label>
<label className="input input-bordered flex items-center gap-2 my-4">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text"  name="name" className="grow" placeholder="Username" />
</label>
<label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password"  name="password" className="grow" placeholder="Password" />

</label>
<p className="text-red-500">{error}</p>
<label className="input input-bordered w-60  flex items-center gap-2 my-4">
 
  <input type="file"  name="image" className="border-2 border-gray-600  w-72 md:w-60"  />

</label>


</div>
 <div>
 <label className="form-control w-full  -mt-4 ">
  <div className="label">
   </div>
  <select className="w-72" name='role'>
    <option disabled selected>Select your role</option>
    <option>Employee</option>
    <option>Hr</option>
    </select>
 </label>
 <label className="input input-bordered flex items-center gap-2 my-4">
 
 <input type="text"  name="salary" className="grow" placeholder="Salary" />
</label>
<label className="input input-bordered flex items-center gap-2 my-4">

 <input type="text"  name="bankaccountno" className="grow" placeholder="Bank Account No" />
</label>
<label className="input input-bordered flex items-center gap-2 my-4">

 <input type="text"  name="designation" className="grow" placeholder="Designation" />
</label>
 </div>
</div>
 <button
              type='submit'
              className='bg-lime-500 w-full font-bold rounded-md mt-2 py-3 text-white'
            >Registration
  </button>
 
</form>
<SocialBtn></SocialBtn>
              <p className="md:text-right mt-2">Already have account? please <Link to="/login"><span className="text-red-700">Login</span></Link> </p>
        


        </div>
    );
};

export default Registration;