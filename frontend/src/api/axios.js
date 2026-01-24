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
        const accessToken=localStorage.getItem("accessToken");
        if(accessToken)config.headers.Authorization=`Bearer ${accessToken}`;
        return config;
    }
);
//if the token is expired redirect the user to the log in page logic 

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


//define endpoints here
export const register=(data)=>API.post("/user/register",data);
export const login=(data)=>API.post("/user/login",data);
export const getUser=()=>API.get("/user/user");
export const logout=()=>API.post("/user/logout");
export const update=(data)=>API.put("user/user",data);
export const addSkill=(data)=>API.post("user/skills",data);
export const deleteSkill=(skillname)=>API.delete(`user/skills/${skillname}`);
export const analyzeResume=(data)=>API.post("resume/upload",data);//the data has to be a form data 
export default API;