import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";


const Message = () => {
    const axiosSecure = useAxiosSecure();
  
  const { data:message, refetch } = useQuery({
    queryKey: ['message'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/adminMessage');
      console.log(data);
      return data;
    }
  });
    return (
        <div>
            <h1 className="text-center text-3xl font-bold mt-10 text-[#1E429F]">Message For Admin</h1> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 p-5">
                {
                    message.map(item=> 
                        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.email}</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">{item.message}</p>
                        </a>
                        )
                }
            </div>
        </div>
    );
};

export default Message;