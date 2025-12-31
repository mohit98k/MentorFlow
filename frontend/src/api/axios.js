import axios from "axios";

// Creating a base Axios instance
const API = axios.create({
    baseURL:"http://localhost:3000/api/v1",

})

//now an interceptor that will attach the jwt token to every request
//its an function that runs before the req is sent 


//the config is the req configuration object { url:/user/resume , method: "GET", header : {} } like this 
API.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");
        if(token)config.headers.Authorization=`Bearer ${token}`;
        return config;
    }
)

//define endpoints here
export const register=(data)=>API.post("/user/register",data);
export const login=(data)=>API.post("/user/login",data);
export const getUser=()=>API.get("/user/user");

export default API;