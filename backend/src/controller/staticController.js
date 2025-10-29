import { Song } from "../models/songModel.js";
import { User } from "../models/userModel.js";
import { Album } from "../models/albumModel.js";


export const getStatics = async (req, res,next) => {
    try {
        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();

        const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith :{
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    $count: "count",
                }
            ])
        ])



        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            totalArtists: uniqueArtists[0]?.count || 0,
        });


    } catch (error) {
        next(error);
    }
}