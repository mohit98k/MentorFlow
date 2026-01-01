import { Route,Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { Dashboard } from "../pages/Dashboard";
import PublicRoute from "./PublicRoute ";
import PrivateRoute from "./PrivateRoute";

const AppRouter=()=>{
    return (
        <Routes>

            {/* http://localhost:5173/ for this url open register  */}

            <Route 

              path="/" 
              
              element={
                <PublicRoute>
                    <Register/>
                </PublicRoute>
            } /> 

            <Route 

              path="/user/register" 

              element={
                <PublicRoute>
                    <Register/>
                </PublicRoute>

            }/>

            <Route
            
              path="/user/login" 
              
              element={
                <PublicRoute>
                    <Login/>
                </PublicRoute>

            }/>

            <Route 
              
              path="/user/user" 
              
              element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
              }/>
            
        </Routes>
    );
};
export default AppRouter;