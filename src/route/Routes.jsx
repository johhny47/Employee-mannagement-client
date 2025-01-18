import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../page/Home";
import Registration from "../page/Registration";
import DashLayout from "../Layout/DashLayout";
import Login from "../page/Login";
import WorkSheet from "../component/Dashboard/Employee/WorkSheet";
import PaymentHistory from "../component/Dashboard/Employee/PaymentHistory";
import EmployeeList from "../component/Dashboard/Hr/EmployeeList";
import Progress from './../component/Dashboard/Hr/Progress';
import AllEmpoyeeList from "../component/Dashboard/Admin/AllEmpoyeeList";
import Payroll from "../component/Dashboard/Admin/Payroll";
import Details from "../component/Dashboard/Hr/Details";

export const router = createBrowserRouter([{
    
        path: "/",
        element:<MainLayout></MainLayout>,
        children:[
            {
             path:'/',
             element:<Home></Home>   
            },

        ]
},
{path: '/register', element: <Registration/>},
{path: '/login', element: <Login/>},

{  path: '/dashboard',
   element: <DashLayout/>,
   children:
    [
     {
        path: 'worksheet',
        element:<WorkSheet></WorkSheet>
     },
     {
        path: 'paymenthistory',
        element:<PaymentHistory></PaymentHistory>
     },
     {
        path: 'employeelist',
        element:<EmployeeList></EmployeeList>,
        children:[
        
        ]
     },
    
     {
        path: 'progress',
        element:<Progress></Progress>
     },
     {
        path: 'allemployeelist',
        element:<AllEmpoyeeList></AllEmpoyeeList>
     },
     {
        path: 'payroll',
        element:<Payroll></Payroll>
     },
    
    ]
    
   

},
{
   
      path: '/details/:id',
      element:<Details></Details>
   
}

])