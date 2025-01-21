import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaCheck, FaCross, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const AllEmpoyeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { data: myData, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await axiosSecure('/allemployeelist');
      return data;
    }
  });

  const handleMakeHr = (item) => {
    axiosSecure.patch(`/makehr/${item._id}`).then(res => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleFire = async (item) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Fire Employee!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/fire/${item._id}`);
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted',
              text: 'Task deleted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

 
  const [isCardView, setIsCardView] = useState(false);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-10 text-[#1E429F]">All Employee List</h1>
    <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setIsCardView(prevState => !prevState)} // 
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle For Card View</span>
        </label>
      </div>

     
      <div className="mt-10">
        {isCardView ? (
        <div>
            {myData?.map(item => (
              <div key={item._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-white">
                  Employee Name: <span className="text-2xl font-bold">{item.name}</span>
                </h5>
                <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
                  Employee Designation: <span className="font-normal text-gray-700">{item.designation}</span>
                </p>
                <div className="flex justify-between">
                  {/* Button to make HR */}
                  {item.role === "Hr" ? (
                    <button className="px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg">HR</button>
                  ) : (
                    <button
                      className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg"
                      onClick={() => handleMakeHr(item)}
                    >
                      MAKE HR
                    </button>
                  )}

                  {/* Button to fire employee */}
                  {item.fire === "Fired" ? (
                    <button className="px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg">Fired</button>
                  ) : (
                    <button className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg" onClick={() => handleFire(item)}>
                      Fire
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
         <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Designation</Table.HeadCell>
                <Table.HeadCell>Make HR</Table.HeadCell>
                <Table.HeadCell>Fire</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {myData?.map(item => (
                  <Table.Row key={item._id} className="bg-white font-bold dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.designation}</Table.Cell>
                    <Table.Cell>
                      <button className="ml-7 my-2" onClick={() => handleMakeHr(item)}>
                        {item.role}
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => handleFire(item)}>{item.fire ? "Fired" : "Fire"}</button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEmpoyeeList;
