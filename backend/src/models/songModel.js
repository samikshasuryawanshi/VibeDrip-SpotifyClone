import mongoose  from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    audioUrl:{
        type: String,
        required: true,
    },
    albumId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: false,
    },
    duration: {
        type: Number,
        required: true,
    },
}, { timestamps: true } // added createdAt and updatedAt fields
);

export const Song =  mongoose.model("Song", songSchema);