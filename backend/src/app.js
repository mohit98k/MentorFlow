import express from 'express';
const app=express();
import cors from 'cors';


app.use(cors({
    origin:"http://localhost:5173" // your React frontend
}));

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse form-data if needed

export default app;
