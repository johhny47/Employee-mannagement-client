import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import AuthContext from '../provider/AuthContext';

const PrivateRoute = ({children}) => {
   
        const { user } = useContext(AuthContext);
        if(!user){
            return <Navigate to="/login" replace={true} />
        }
        return children;
  
};

export default PrivateRoute;