import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../provider/AuthContext";



export const axiosSucure =axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
})

const useAxiosSecure = ()=>{
    const { handleLogout}=useContext(AuthContext)
    const navigate = useNavigate()
   useEffect(()=>{
    axiosSucure.interceptors.response.use(
        res=>{
            return res 
        },
       async error =>{
        console.log(error.response);
        if(error.response.status ===401 || error.response.status ===403){
            handleLogout()
            navigate('/login') 
            console.log(error.message)
           
        }
       } 
    )
   },[handleLogout, navigate])
   return axiosSucure
}

export default useAxiosSecure