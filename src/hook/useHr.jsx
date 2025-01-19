import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"; 
import AuthContext from "../provider/AuthContext";  
import useAxiosSecure from "./useAxiosSecure";

const useHr = () => {

  const { user } = useContext(AuthContext);
  
  
  const axiosSecure = useAxiosSecure();
  
 
  const { data: isHr, isLoading: isHrLoading } = useQuery(
    {
      queryKey: [user?.email, 'isHr'],
      queryFn: async () => {
       const res  = await axiosSecure.get(`/hrCheck/${user?.email}`);
        console.log(res.data);  
        return res.data?.Hr;  
      },
    
    }
  );

  return [isHr, isHrLoading];
};

export default useHr;
