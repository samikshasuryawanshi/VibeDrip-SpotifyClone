import mongoose  from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },//clerk user id
  recieverId: { type: String, required: true }, 
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);