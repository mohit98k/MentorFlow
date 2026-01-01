import React from 'react'
import { Navigate} from 'react-router-dom'

const  PublicRoute  = ({children}) => {
    const token = localStorage.getItem("accessToken");
    let isAuth=false;
    if(token){
         isAuth=true;
    }
   if(isAuth){
    //the user is logged in so redirct to dashboard
   return <Navigate to="/user/user" replace />;
   }else{
    return children;
   }
}
export default PublicRoute;