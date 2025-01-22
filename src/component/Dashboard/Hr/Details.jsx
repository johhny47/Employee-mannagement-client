import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LabelList,Cell } from "recharts";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet} from 'react-helmet-async';
const Details = () => {
    const  axiosSecure = useAxiosSecure();
    const params = useParams();
    console.log(params.id);

    const { data, refetch,isLoading,isError,error } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/details/${params?.id}`);
            return data;
        }
    });

   
    const convertToDate = (month, year) => {
       
        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const monthIndex = monthNames.indexOf(month.toLowerCase());
        return new Date(year, monthIndex); 
    };

    // Prepare chart data and sort by date
    const chartData = data?.map(item => ({
        Month: `${item.month.slice(0, 3).toLowerCase()} '${item.year.toString().slice(-2)}`,
        Salary: item.salary, 
        date: convertToDate(item.month.slice(0, 3), item.year), 
    })) || [];

   
    const sortedChartData = chartData.sort((a, b) => a.date - b.date);

    if (isLoading) {
        return <div>Loading...</div>
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>
      }
    
      if (data?.length === 0) {
        return <div>No details found</div> 
      }

    return (
        <div className="max-w-6xl mx-auto mt-14">
            <Helmet>
        <title>Details</title>
      
          </Helmet>
            <h1 className="text-center text-3xl font-bold">Employee Details</h1>
            {
                data && data.length > 0 ? (
                    <div>
                      
                        <img className="h-20 w-20 rounded-full mx-auto" src={data[0]?.employeePhoto} alt="Employee" />
                        
                      
                        <h2 className="font-bold mt-2 text-center">{data[0]?.employee_name}</h2>
                        
                       
                        <p className="text-center">Designation: {data[0]?.designation}</p>
                        
                        {/* Displaying the bar chart */}
                        <BarChart
    width={1100}
    height={300}
    data={sortedChartData}
    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Month" />
    <YAxis tickFormatter={(tick) => `$${tick}`} />
    <Tooltip />
    <Legend />
    <Bar dataKey="Salary" barSize={30}>
        <LabelList dataKey="Salary" position="top" style={{ fill: "#000", fontSize: 12 }} />
        {sortedChartData.map((entry, index) => (
            <Cell
                key={`cell-${index}`}
                fill={["#4CAF50", "#FF5722", "#FFEB3B", "#03A9F4"][index % 4]}
            />
        ))}
    </Bar>
</BarChart>


                    </div>
                ) : (
                    <p className="text-center text-red-500">No data available</p>
                )
            }
        </div>
    );
};

export default Details;
