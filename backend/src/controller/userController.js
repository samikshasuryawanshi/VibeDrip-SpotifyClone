import {User} from '../models/userModel.js';
import { Message } from "../models/messageModel.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        // console.log("Current User ID:", currentUserId);
        
        const users = await User.find({clerkId: {$ne: currentUserId}});
        // console.log("Found users:", users);
        
        res.status(200).json({users});

    } catch (error) {
        console.log("Error in getAllUsers:", error);
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId;      // logged-in clerk user ID
        const { userId } = req.params;     // other user ID

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userId },
                { senderId: userId, recieverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages:", error);
        next(error);
    }
};
