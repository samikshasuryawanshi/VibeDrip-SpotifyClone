import {User} from '../models/userModel.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        // console.log("Current User ID:", currentUserId);
        
        const users = await User.find({clerkID: {$ne: currentUserId}});
        // console.log("Found users:", users);
        
        res.status(200).json({users});

    } catch (error) {
        console.log("Error in getAllUsers:", error);
        next(error);
    }
}