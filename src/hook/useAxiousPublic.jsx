import axios from "axios";


export const axiosPublic =axios.create({
    baseURL:import.meta.env.VITE_API_URL
   
})




const useAxiousPublic = () => {
    return axiosPublic 
       
};

export default useAxiousPublic;