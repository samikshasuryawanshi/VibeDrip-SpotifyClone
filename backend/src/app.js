import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {clerkMiddleware} from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';

import {connectDB} from './lib/db.js';


import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/songs.route.js';
import albumRoutes from './routes/albums.route.js';
import staticRoutes from './routes/static.route.js';



dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


app.use(express.json()); // to parse req.body
app.use(clerkMiddleware());// this will add auth to req object
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'uploads'),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}));// to handle file uploads


app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",staticRoutes);

//error handling middleware
app.use((err, req, res, next)=>{
    // console.error(err.stack);
    res.status(500).json({message: process.env.NODE_ENV === 'production' ? "Internal Server Error": err.message});
})


app.listen(PORT,()=>{
    console.log("Backend server is running on port : " + PORT);
    connectDB();
})