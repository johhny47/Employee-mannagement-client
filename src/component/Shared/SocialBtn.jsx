import { useContext, useState } from "react";
import useAxiousPublic from "../../hook/useAxiousPublic";
import AuthContext from "../../provider/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const SocialBtn = () => {
    const axiosPublic = useAxiousPublic()
  
 
  const {handleRegister,mannageProfile,handleGoogleLogin,user }= useContext(AuthContext)
  
  const [error,setError] = useState()
  const navigate=useNavigate()
    
     
     const handleGoogleLoged = async () => {
        try {
        
          const googleData = await handleGoogleLogin();
          const { email, displayName,photoURL} = googleData;
          console.log(email)
    
        
          const UserInfo = {
            name:user?.displayName,
            email:user?.email,
            role:'Employee',
            img_url:user?.photoURL
            };
    
         
          const res = await axiosPublic.post('/user', UserInfo);
    
          if (res.data.insertedId) {
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
        <div className="form-control mt-6">
           
               
        <button onClick={handleGoogleLoged}  className="btn "> <FcGoogle size={28} /><p>Continue with Google</p></button>
      
         
       </div>
    );
};

export default SocialBtn;