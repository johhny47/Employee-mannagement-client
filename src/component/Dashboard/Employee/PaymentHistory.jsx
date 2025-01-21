import { Table } from "flowbite-react";
import { useContext } from "react";
import AuthContext from "../../../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const {user}=useContext(AuthContext)
    const email = user?.email
    console.log(email);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/paymenthistory/${user?.email}`);
          console.log(data);
          return data;
        }
      });
    return (
        <div>
            <h1 className=" text-center text-3xl font-bold mt-10 text-[#1E429F]">Payment History</h1>
              {/* Table */}
                  <div className="overflow-x-auto mt-10">
                  
            <Table>
                  <Table.Head>
                  <Table.HeadCell>Month</Table.HeadCell>
                  <Table.HeadCell>Year</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Transaction Id</Table.HeadCell> 
                 
                         
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {data?.map(item => (
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                      
                            <Table.Cell>{item?.month}</Table.Cell>
                            <Table.Cell>{item?.year}</Table.Cell>
                            <Table.Cell>{item?.salary}</Table.Cell>
                            <Table.Cell>{item?.Trans_id}</Table.Cell>
                          
                            
                            </Table.Row>
                        ))}
                      </Table.Body>
                      
                      </Table>
                    
                  </div>
        </div>
    );
};

export default PaymentHistory;