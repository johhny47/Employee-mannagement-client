import { useContext, useState } from "react";
import useAxiousPublic from "../../hook/useAxiousPublic";
import AuthContext from "../../provider/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";


const SocialBtn = () => {
    const axiosPublic = useAxiousPublic()
  
 
  const {handleRegister,mannageProfile,handleGoogleLogin,user }= useContext(AuthContext)
  
  const [error,setError] = useState()
  const navigate = useNavigate()
    
     
     const handleGoogleLoged = async () => {
        try {
        
          const googleData = await handleGoogleLogin();
          const {user}= googleData
          const { email, displayName,photoURL} = user;
        
            console.log(email);
        
          const UserInfo = {
            name:displayName,
            email:email,
           
            img_url:photoURL,
            salary:"",
            bankAccountNo:"",
            designation:"",
            Verified:"",
            };
    
         
          const res = await axiosPublic.post('/user', UserInfo);
    
          if (email || res.data.insertedId){
            console.log('User added to the database');
            navigate('/');
            toast.success('Signup Successful');
          }
        } catch (err) {
          console.error(err);
          toast.error(err?.message || "An error occurred with Google login");
        }
      };
    return (
       
           
               
        <button onClick={handleGoogleLoged} className="bg-gradient-to-r from-cyan-500 to-blue-500  w-full rounded-md mt-2 py-3 text-white flex justify-center gap-2 font-bold">
          <FcGoogle className="" size={28} />
          <p >Continue with Google</p></button>
      
         
     
    );
};

export default SocialBtn;