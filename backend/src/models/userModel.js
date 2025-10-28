import mongoose from "mongoose";    
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,   
        required: true,
    },
    imageUrl :{
        type: String,
        required: true,
    },
    clerkID :{
        type:String,
        required: true,
        unique: true,
    },
    },{ timestamps: true } // added createdAt and updatedAt fields
);

export default mongoose.model("User", userSchema);