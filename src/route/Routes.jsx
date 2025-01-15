import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../page/Home";
import Registration from "../page/Registration";
import DashLayout from "../Layout/DashLayout";
import Login from "../page/Login";

export const router = createBrowserRouter([{
    
        path: "/",
        element:<MainLayout></MainLayout>,
        children:[
            {
             path:'/',
             element:<Home></Home>   
            }
        ]
},
{path: '/register', element: <Registration/>},
{path: '/login', element: <Login/>},

{  path: '/dashboard',
   element: <DashLayout/>

}

])