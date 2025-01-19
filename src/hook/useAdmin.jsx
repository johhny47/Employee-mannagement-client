import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"; 
import AuthContext from "../provider/AuthContext";  
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {

  const { user } = useContext(AuthContext);
  
  
  const axiosSecure = useAxiosSecure();
  
 
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
    {
      queryKey: [user?.email, 'isAdmin'],
      queryFn: async () => {
       const res  = await axiosSecure.get(`/adminCheck/${user?.email}`);
        console.log(res.data);  
        return res.data.admin;  
      },
    
    }
  );

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
