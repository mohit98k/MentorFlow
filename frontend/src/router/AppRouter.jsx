import { Route,Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import PublicRoute from "./PublicRoute ";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Resume from "../pages/Resume";
import Roadmaps from "../pages/Roadmaps";
import Profile from "../pages/Profile";
import Logout from "../pages/Logout";

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

              path="/register" 

              element={
                <PublicRoute>
                    <Register/>
                </PublicRoute>

            }/>

            <Route
            
              path="/login" 
              
              element={
                <PublicRoute>
                    <Login/>
                </PublicRoute>

            }/>

{/* nested routing wattch out !!! */}

            <Route 
              element={
                <PrivateRoute>
                    <DashboardLayout/>
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />

            </Route>
            
        </Routes>
    );
};
export default AppRouter;