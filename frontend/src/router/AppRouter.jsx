import { Route,Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { Dashboard } from "../pages/Dashboard";

const AppRouter=()=>{
    return (
        <Routes>

            {/* http://localhost:5173/ for this url open register  */}
            <Route path="/" element={<Register/>} /> 

            <Route path="/user/register" element={<Register/>}/>
            <Route path="/user/login" element={<Login/>}/>
            <Route path="/user/user" element={<Dashboard/>}/>
            
        </Routes>
    );
};
export default AppRouter;