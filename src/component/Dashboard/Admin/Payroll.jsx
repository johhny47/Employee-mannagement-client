import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import AdminPay from "./AdminPay";


const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false)
  const { data:myData, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/payroll');
      return data;
    }
  });

  const close = () => setIsOpen(false);
  return (
    <div>
      <h1 className=" text-center text-3xl font-bold mt-10 text-[#1E429F]">Payroll</h1>
    
      <div className="overflow-x-auto mt-10">
        <Table>
          <Table.Head>
            <Table.HeadCell>Employee’s Name</Table.HeadCell>
            <Table.HeadCell>Employee’s Email</Table.HeadCell>
            <Table.HeadCell>Month</Table.HeadCell>
            <Table.HeadCell>Year</Table.HeadCell>
            <Table.HeadCell>Salary</Table.HeadCell>
            <Table.HeadCell>Payment Date</Table.HeadCell>
            <Table.HeadCell>Pay</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {myData?.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                <Table.Cell>{item.employee_name}</Table.Cell>
                <Table.Cell>{item.employee_email}</Table.Cell>
                <Table.Cell>{item.month}</Table.Cell>
                <Table.Cell>{item.year}</Table.Cell>
                <Table.Cell>{item.salary}</Table.Cell>
                <Table.Cell>{item?.updated_time?.split('T')[0]}</Table.Cell>
                <Table.Cell><button onClick={() => setIsOpen(true)} >
                                <AdminPay  close={close} isOpen={isOpen} item={item}  refetch={refetch} setIsOpen={setIsOpen} ></AdminPay> 
                                </button></Table.Cell>
               
         </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Payroll;
