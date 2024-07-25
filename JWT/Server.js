import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import UserRouter from './routes/user.route.js';
dotenv.config();
const app = express();
const port = process.env.port;
const DATABASE_URL = process.env.Db;

//CORS policy
app.use(cors());

//CoNNECT DATABASE
connectDB(DATABASE_URL);

//JSON
app.use(express.json());

//LOAD ROUTES
app.use("/api/user", UserRouter);





app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
})