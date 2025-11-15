import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true }, // clerk id
    recieverId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// ⏳ Auto-delete messages after 24 hours
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

export const Message = mongoose.model("Message", messageSchema);
