import { User } from "../models/userModel.js";


export const authCallback = async (req, res, next) => {

    try {
        const {id,firstName,lastName,imageUrl} = req.body;
        // console.log(id,firstName,lastName,imageUrl);

        const user = await User.findOne({clerkId:id});

        if(!user){
            //signUp
            await User.create({
                clerkId:id,
                fullName: `${firstName} ${lastName}`,
                imageUrl:imageUrl
            }); 
        }

        res.status(200).json({success:true});

    } catch (error) {
        console.log("Error in auth callback:", error);
        next(error);
    }
    
}