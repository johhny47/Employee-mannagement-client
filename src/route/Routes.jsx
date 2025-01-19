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
import PrivateRoute from './../private/PrivateRoute';

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
   element:  <PrivateRoute><DashLayout/></PrivateRoute>,
   children:
    [
     {
        path: 'worksheet',
        element:<PrivateRoute><WorkSheet></WorkSheet></PrivateRoute>
     },
     {
        path: 'paymenthistory',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
     },
     {
        path: 'employeelist',
        element: <PrivateRoute><EmployeeList></EmployeeList></PrivateRoute>,
       
     },
    
     {
        path: 'progress',
        element:<PrivateRoute><Progress></Progress></PrivateRoute>
     },
     {
        path: 'allemployeelist',
        element:<PrivateRoute><AllEmpoyeeList></AllEmpoyeeList></PrivateRoute>
     },
     {
        path: 'payroll',
        element:<PrivateRoute><Payroll></Payroll></PrivateRoute>
     },
    
    ]
    
   

},
{
   
      path: '/details/:id',
      element:<PrivateRoute><Details></Details></PrivateRoute>
   
}

])