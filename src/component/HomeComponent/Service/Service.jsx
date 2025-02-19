import { FaCartShopping } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";

import { MdLocalHospital } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";

const cards = [
    {
        id: 1,
        heading:'Retail',
        paragraph:"Manage staff over multiple sites, automatically creating timesheets that link to your Payroll provider.",
        logo:<FaCartShopping size={40}></FaCartShopping>
    },
    {
        id: 2,
        heading:'Education',
        paragraph:"Manage your permanent staff or send job notifications instantly to thousands of relievers",
        logo:<PiStudentBold size={40} />
    },
    {
        id: 3,
       heading:'Trade & Labour',
        paragraph:"In addition to rostering, use the system to monitor staff induction, training and compliance.",
        logo:<GrUserWorker size={40} />
    },
    {
        id: 4,
        heading:'Hospitality',
        paragraph:"Use our event function to create individual events and automatically capture their time and attendance which flows through to timesheets.",
        logo:<MdLocalShipping size={40} />
       
    },
    {
        id: 5,
       heading:'Health Care',
        paragraph:"Manage multiple roles, allowing staff to easily change shifts.",
        logo:<MdLocalHospital size={40} />
    
    },
    {
        id: 6,
       heading:'Distribution',
       paragraph:"Manage everything from transportation through to warehouses.",
    },
   
   
];

const Service = () => {
    return (
        <div>
            <h1 className="text-center font bold text-2xl md:text-3xl lg:text-4xl  my-14 ">Our Service</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-5">
            {cards.map((cart) => 

<div class="max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {cart?.logo}
    <a href="#">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{cart.heading}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{cart.paragraph}</p>
   
</div>
)}
            </div>
        </div>
    );
};

export default Service;
