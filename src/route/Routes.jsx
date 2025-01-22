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
import EmployeeRoute from "../private/EmployeeRoute";
import HrRoute from "../private/HrRoute";
import AdminRoute from "../private/AdminRoute";
import DashBoardHome from "../component/Dashboard/DashBoardHome";
import ContactUs from "../page/ContactUs";
import Message from "../component/Dashboard/Admin/Message";
import ErrorPage from "../page/ErrorPage";

export const router = createBrowserRouter([{
    
        path: "/",
        element:<MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
             path:'/',
             element:<Home></Home>   
            },
            {
               path:'/contact',
               element:<ContactUs></ContactUs>  
              },
           

        ]
},
{path: '/register', element: <Registration/>},
{path: '/login', element: <Login/>},

{  path: '/dashboard',
   element:  <DashLayout/>,
   children:
    [ {
      index: true,
      element: (
        <PrivateRoute>
       <DashBoardHome></DashBoardHome>
        </PrivateRoute>
      ),
    },
     {
        path: 'worksheet',
        element:<PrivateRoute><EmployeeRoute><WorkSheet></WorkSheet></EmployeeRoute> </PrivateRoute>
     },
     {
        path: 'paymenthistory',
        element: <PrivateRoute><EmployeeRoute><PaymentHistory></PaymentHistory></EmployeeRoute></PrivateRoute>
     },
     {
        path: 'employeelist',
        element: <PrivateRoute><HrRoute><EmployeeList></EmployeeList></HrRoute> </PrivateRoute>,
       
     },
    
     {
        path: 'progress',
        element:<PrivateRoute><HrRoute><Progress></Progress></HrRoute></PrivateRoute>
     },
     {
        path: 'allemployeelist',
        element:<PrivateRoute><AdminRoute><AllEmpoyeeList></AllEmpoyeeList></AdminRoute></PrivateRoute>
     },
     {
        path: 'payroll',
        element:<PrivateRoute><AdminRoute><Payroll></Payroll></AdminRoute></PrivateRoute>
     },
     {
      path: 'message',
      element:<PrivateRoute><AdminRoute><Message></Message> </AdminRoute></PrivateRoute>
   },
    
    ]
    
   

},
{
   
      path: '/details/:id',
      element:<PrivateRoute><Details></Details></PrivateRoute>
   
}

])