import mongoose from "mongoose";
import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import { config } from "dotenv";

config();

const seedSongsWithAlbums = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Song.deleteMany({});
		await Album.deleteMany({});

		console.log("Creating songs...");

		// Create all songs first
		const createdSongs = await Song.insertMany([
			{
				title: "Aap se Milkar Acha Laga - Ringtone Version",
				artist: "Ayushmaan Khuraana",
				imageUrl: "/cover-images/1.png",
				audioUrl: "/songs/1.mp3",
				duration: 29,
			},
			{
				title: "Aasan Nahin Yahan",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/2.jpeg",
				audioUrl: "/songs/2.mp3",
				duration: 214,
			},
			{
				title: "Aashiq tera",
				artist: "Sohail Sen",
				imageUrl: "/cover-images/3.jpeg",
				audioUrl: "/songs/3.mp3",
				duration: 42,
			},
			{
				title: "Ae Dil Hai Mushkil",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				duration: 269,
			},
			{
				title: "Tu You",
				artist: "Armaan Malik",
				imageUrl: "/cover-images/5.png",
				audioUrl: "/songs/5.mp3",
				duration: 195,
			},
			{
				title: "Baarish - Half Girlfriend",
				artist: "Ash King",
				imageUrl: "/cover-images/6.jpg",
				audioUrl: "/songs/6.mp3",
				duration: 275,
			},
			{
				title: "Chahun Main Ya Naa Lofi mix",
				artist: "Undefined",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				duration: 39,
			},
			{
				title: "Desert Wind",
				artist: "Sahara Sons",
				imageUrl: "/cover-images/8.jpg",
				audioUrl: "/songs/8.mp3",
				duration: 28,
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				duration: 28,
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				duration: 30,
			},
			{
				title: "Winter Dreams",
				artist: "Arctic Pulse",
				imageUrl: "/cover-images/11.jpg",
				audioUrl: "/songs/11.mp3",
				duration: 29,
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				duration: 17,
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				duration: 39,
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				duration: 27,
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				duration: 36,
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				duration: 39,
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				duration: 39,
			},
			{
				title: "Midnight Blues",
				artist: "Jazz Cats",
				imageUrl: "/cover-images/18.jpg",
				audioUrl: "/songs/18.mp3",
				duration: 29,
			},
		]);

		console.log(`Created ${createdSongs.length} songs`);

		// Create albums with song references
		const albums = [
			{
				title: "Bollywood Hits",
				artist: "Various Artists",
				imageUrl: "/albums/1.png",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 7).map((song) => song._id), // First 7 songs
			},
			{
				title: "Chill Vibes",
				artist: "Various Artists",
				imageUrl: "/albums/2.png",
				releaseYear: 2024,
				songs: createdSongs.slice(7, 12).map((song) => song._id), // Next 5 songs
			},
			{
				title: "Night Sessions",
				artist: "Various Artists",
				imageUrl: "/albums/3.png",
				releaseYear: 2024,
				songs: createdSongs.slice(12, 16).map((song) => song._id), // Next 4 songs
			},
			{
				title: "Urban Dreams",
				artist: "Various Artists",
				imageUrl: "/albums/4.png",
				releaseYear: 2023,
				songs: createdSongs.slice(16, 18).map((song) => song._id), // Last 2 songs
			},
		];

		console.log("Creating albums...");
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongIds = albums[i].songs;

			await Song.updateMany(
				{ _id: { $in: albumSongIds } },
				{ albumId: album._id }
			);
		}

		console.log(`Created ${createdAlbums.length} albums`);
		console.log("✅ Database seeded successfully with songs and albums!");
		console.log("\nAlbum Summary:");
		createdAlbums.forEach((album, index) => {
			console.log(`${index + 1}. ${album.title} - ${albums[index].songs.length} songs`);
		});

	} catch (error) {
		console.error("❌ Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongsWithAlbums();