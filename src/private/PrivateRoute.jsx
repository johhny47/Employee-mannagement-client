import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
   
        const { user } = useContext(AuthContext);
        if(!user){
            return <Navigate to="/login" replace={true} />
        }
        return children;
  
};

export default PrivateRoute;