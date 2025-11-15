import { User } from "../models/userModel.js";

export const authCallback = async (req, res, next) => {
    try {
        const {id, firstName, lastName, imageUrl} = req.body;

        // Use clerkId  to match the model
        const user = await User.findOne({clerkId: id});

        if(!user){
            //signUp
            const newUser = await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl: imageUrl
            });
            console.log("New user created:", newUser);
        } else {
            console.log("User already exists:", user);
        }

        res.status(200).json({success: true});

    } catch (error) {
        console.log("Error in auth callback:", error);
        next(error);
    }
}