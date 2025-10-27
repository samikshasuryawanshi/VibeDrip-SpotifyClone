import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/album",albumRoutes);
app.use("/api/stats",staticRoutes);


app.listen(PORT,()=>{
    console.log("Backend server is running on port : " + PORT);
})