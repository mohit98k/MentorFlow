import express from 'express';
const app=express();
import cors from 'cors';
import cookieParser from "cookie-parser";

app.use(cookieParser());

//global middlewares
app.use(cors({
    origin:"http://localhost:5173" //  React frontend
}));

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse form-data if needed



import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user",userRoutes);//For any request that starts with /api/v1/user, hand it over to userRoutes

import resumeRoutes from "./routes/resume.route.js";
app.use("/api/v1/resume",resumeRoutes);

import jobRoutes from "./routes/job.routes.js";
app.use("/api/v1/job",jobRoutes);

import roadMapRoutes from "./routes/roadmap.routes.js";
app.use("/api/v1/roadmaps",roadMapRoutes);

export default app;
