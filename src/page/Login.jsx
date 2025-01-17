import { useContext, useState } from "react";
import AuthContext from "../provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2'
import SweetAlert2 from "react-sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";

import { FcGoogle } from "react-icons/fc";
import SocialBtn from "../component/Shared/SocialBtn";



const Login = () => {
  const {handleLogin,handleGoogleLogin}= useContext(AuthContext)
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const [error,setError] = useState()
    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value
        const password = form.password.value
       
       
        
        handleLogin(email,password)
        .then(res=>{
              
            Swal.fire({
              title: 'Successful!',
              text: 'Successfully logged in',
              icon: 'success',
              confirmButtonText: 'ok'
            })
            navigate("/")
            setLoading(true)
           
          })
          .catch(err=>
           
            Swal.fire({
              title: 'Error!',
              text: `${err.message}`,
              icon: 'error',
              confirmButtonText: 'ok'
            })
         
        )
   
    }

    return (
      <div className="md:max-w-3xl mx-auto bg-[#C3DDFD]  mt-20 md:mt-24 p-5 rounded-lg">
      <h1 className="mx-20 md:mx-60 text-[#8DA2FB]  font-bold text-3xl md:text-5xl">Login</h1>
<form onSubmit={handleSubmit}>
<label className="input input-bordered flex items-center gap-2 my-4">
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


 <button
              type='submit'
              className='bg-lime-500 w-full rounded-md mt-2 py-3 text-white'
            >
              Login
            
            </button>
           <SocialBtn></SocialBtn>
              <p className="mt-2">Don't have account? please <Link to="/register"><span className="text-blue-700">Register</span></Link> </p>

</form>
        </div>
    );
};

export default Login;