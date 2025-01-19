import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"; 
import AuthContext from "../provider/AuthContext";  
import useAxiosSecure from "./useAxiosSecure";

const useEmployee = () => {

  const { user } = useContext(AuthContext);
  
  
  const axiosSecure = useAxiosSecure();
  
 
  const { data: isEmployee, isLoading:isEmployeeLoading } = useQuery(
    {
      queryKey: [user?.email, 'isEmployee'],
      queryFn: async () => {
       const res  = await axiosSecure.get(`/employeeCheck/${user?.email}`);
        console.log(res.data);  
        return res.data?.Employee;  
      },
    
    }
  );

  return [isEmployee, isEmployeeLoading];
};

export default useEmployee;
