import { Album } from "../models/albumModel.js";

export const getAllAlbum = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.error("Error in getAllAlbum:", error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Populate the songs array with full song details
    const album = await Album.findById(id).populate('songs');
    
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    
    res.status(200).json(album);
  } catch (error) {
    console.error("Error in getAlbumById:", error);
    next(error);
  }
};