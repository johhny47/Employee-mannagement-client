import { Table, Pagination } from "flowbite-react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet} from 'react-helmet-async';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const { data,refetch,isLoading,isError,error } = useQuery({
        queryKey: ['paymentHistory', email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/paymenthistory/${email}`);
            return data;
        },
    });

    const convertToDate = (month, year) => {
        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const monthIndex = monthNames.indexOf(month.toLowerCase());
        return new Date(year, monthIndex);
    };

    const sortedData = data?.sort((a, b) => {
        const dateA = convertToDate(a.month, a.year);
        const dateB = convertToDate(b.month, b.year);
        return dateA - dateB;
    });

    const paginatedData = sortedData?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); 
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(sortedData?.length / rowsPerPage))); 
    };
    if (isLoading) {
        return <div>Loading...</div>
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>
      }
    
      if (data?.length === 0) {
        return <div>No employees found</div> 
      }
    return (
        <div>
            <Helmet>
        <title>Payment-History</title>
      
          </Helmet>
            <h1 className="text-center text-3xl font-bold mt-10 text-[#1E429F]">Payment History</h1>

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
                        {isLoading ? (
                            <Table.Row>
                                <Table.Cell colSpan="4" className="text-center">Loading...</Table.Cell>
                            </Table.Row>
                        ) : (
                            paginatedData?.map((item) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                                    <Table.Cell>{item?.month}</Table.Cell>
                                    <Table.Cell>{item?.year}</Table.Cell>
                                    <Table.Cell>{item?.salary}</Table.Cell>
                                    <Table.Cell>{item?.Trans_id}</Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </div>

            {/* Pagination */}
            {data && data.length > rowsPerPage && (
                <div className="mt-4 flex justify-center items-center">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-l-lg"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    <span className="px-4">
                        Page {currentPage} of {Math.ceil(sortedData?.length / rowsPerPage)}
                    </span>

                    <button
                        className="px-4 py-2 bg-gray-300 rounded-r-lg"
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(sortedData?.length / rowsPerPage)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
