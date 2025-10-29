import {Song} from "../models/songModel.js";
import {Album} from "../models/albumModel.js";


export const createSong = async (req, res, next) => {
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      return res.status(400).json({message: "Audio file and cover image are required."});
    }
    const {title, artist, albumId, duration} = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    })

    await song.save();


    //if song belongs to an album, update the album's songs array
    if(albumId){
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json({message: "Song created successfully", song});
    
  } catch (error) {
    console.log("Error creating song:", error);
    next(error);
  }
}