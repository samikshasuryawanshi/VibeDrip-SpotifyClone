import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
   const conn =await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connect to mongodb`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure , 0 is used for success
  }
};