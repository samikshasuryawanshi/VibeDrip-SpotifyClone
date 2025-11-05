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
				title: "Chashni - Bharat",
				artist: "Sahara Sons",
				imageUrl: "/cover-images/8.jpg",
				audioUrl: "/songs/8.mp3",
				duration: 28,
			},
			{
				title: "Count On Me",
				artist: "Bruno Mars",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				duration: 236,
			},
			{
				title: "Dhokha Dhadi",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				duration: 248,
			},
			{
				title: "Dil Ke Paas",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/11.jpg",
				audioUrl: "/songs/11.mp3",
				duration: 17,
			},
			{
				title: "Dil Tu Jaan Tu - Gurnazar",
				artist: "Gurnazar",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				duration: 39,
			},
			{
				title: "Duniyaa - Luka Chuppi",
				artist: "Vishal Mishra",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				duration: 27,
			},
			{
				title: "Shape Of You",
				artist: "Ed Sheeran",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				duration: 36,
			},
			{
				title: "Fakira - Student Of The Year 2",
				artist: "Vishal & Shekhar",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				duration: 39,
			},
			{
				title: "Hall of Fame - The Script",
				artist: "The Script",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				duration: 39,
			},
			{
				title: "Hamdard - Ek Villain",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				duration: 29,
			},
			{
				title: "Hasi (Male Version)",
				artist: "Ami Mishra",
				imageUrl: "/cover-images/18.jpg",
				audioUrl: "/songs/18.mp3",
				duration: 29,
			},
			{
				title: "Hawayein",
				artist: "Flute Siva",
				imageUrl: "/cover-images/19.jpg",
				audioUrl: "/songs/19.mp3",
				duration: 214,
			},
			{
				title: "Hum Mar Jayenge",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/20.jpg",
				audioUrl: "/songs/20.mp3",
				duration: 42,
			},
			{
				title: "I Wanna Fall In Love - Pop Kaun",
				artist: "Kunal Khemu, Nupur Sanon",
				imageUrl: "/cover-images/21.jpg",
				audioUrl: "/songs/21.mp3",
				duration: 269,
			},
			{
				title: "Ilahi (Yeh Jawaani Hai Deewani)",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/22.jpg",
				audioUrl: "/songs/22.mp3",
				duration: 195,
			},
			{
				title: "Imagine Dragons - Believer (Instrumental)",
				artist: "Instrumental",
				imageUrl: "/cover-images/23.jpg",
				audioUrl: "/songs/23.mp3",
				duration: 275,
			},
			{
				title: "It is Realme",
				artist: "Realme",
				imageUrl: "/cover-images/24.jpg",
				audioUrl: "/songs/24.mp3",
				duration: 39,
			},
			{
				title: "Jaan Ban Gaye (Khuda Haafiz)",
				artist: "Mithoon",
				imageUrl: "/cover-images/25.jpg",
				audioUrl: "/songs/25.mp3",
				duration: 28,
			},
			{
				title: "Jab Tak - MS Dhoni",
				artist: "Armaan Malik",
				imageUrl: "/cover-images/26.jpg",
				audioUrl: "/songs/26.mp3",
				duration: 236,
			},
			{
				title: "Jag Ghoomeya - Flute Version",
				artist: "Instrumental",
				imageUrl: "/cover-images/27.jpg",
				audioUrl: "/songs/27.mp3",
				duration: 248,
			},
			{
				title: "Jag Ghoomeya",
				artist: "Rahat Fateh Ali Khan",
				imageUrl: "/cover-images/28.jpg",
				audioUrl: "/songs/28.mp3",
				duration: 17,
			},
			{
				title: "Jag Ghoomeya - Salman Khan Version",
				artist: "Salman Khan",
				imageUrl: "/cover-images/29.jpg",
				audioUrl: "/songs/29.mp3",
				duration: 39,
			},
			{
				title: "Jeena Jeena (Badlapur)",
				artist: "Atif Aslam",
				imageUrl: "/cover-images/30.jpg",
				audioUrl: "/songs/30.mp3",
				duration: 27,
			},
			{
				title: "Jethalal Phone Ringtone",
				artist: "TMKOC",
				imageUrl: "/cover-images/31.jpg",
				audioUrl: "/songs/31.mp3",
				duration: 36,
			},
			{
				title: "Jutti Meri",
				artist: "Neha Bhasin",
				imageUrl: "/cover-images/32.jpg",
				audioUrl: "/songs/32.mp3",
				duration: 39,
			},
			{
				title: "Kal Ho Naa Ho",
				artist: "Sonu Nigam",
				imageUrl: "/cover-images/33.jpg",
				audioUrl: "/songs/33.mp3",
				duration: 39,
			},
			{
				title: "Karan Sehmbi",
				artist: "Goldboy & Tanishk Bagchi",
				imageUrl: "/cover-images/34.jpg",
				audioUrl: "/songs/34.mp3",
				duration: 29,
			},
			{
				title: "Kashmir Main Tu Kanyakumari",
				artist: "Sunidhi Chauhan",
				imageUrl: "/cover-images/35.jpg",
				audioUrl: "/songs/35.mp3",
				duration: 29,
			},
			{
				title: "Kaun Tujhe (MS Dhoni)",
				artist: "Armaan Malik",
				imageUrl: "/cover-images/36.jpg",
				audioUrl: "/songs/36.mp3",
				duration: 214,
			},
			{
				title: "Kesariya - Brahmastra",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/37.jpg",
				audioUrl: "/songs/37.mp3",
				duration: 42,
			},
			{
				title: "Khamoshiyan",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/38.jpg",
				audioUrl: "/songs/38.mp3",
				duration: 269,
			},
			{
				title: "Khol De Par",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/39.jpg",
				audioUrl: "/songs/39.mp3",
				duration: 195,
			},
			{
				title: "Main Koi Aisa Geet Gaoon",
				artist: "Instrumental",
				imageUrl: "/cover-images/40.jpg",
				audioUrl: "/songs/40.mp3",
				duration: 275,
			},
			{
				title: "Main Rahoon Ya Na Rahoon",
				artist: "Armaan Malik",
				imageUrl: "/cover-images/41.jpg",
				audioUrl: "/songs/41.mp3",
				duration: 39,
			},
			{
				title: "Mast Magan",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/42.jpg",
				audioUrl: "/songs/42.mp3",
				duration: 28,
			},
			{
				title: "Meherbani",
				artist: "Jubin Nautiyal",
				imageUrl: "/cover-images/43.jpg",
				audioUrl: "/songs/43.mp3",
				duration: 236,
			},
			{
				title: "Musafir",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/44.jpg",
				audioUrl: "/songs/44.mp3",
				duration: 248,
			},
			{
				title: "Nai Lagda - Notebook",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/45.jpg",
				audioUrl: "/songs/45.mp3",
				duration: 17,
			},
			{
				title: "One Direction - Night Changes",
				artist: "One Direction",
				imageUrl: "/cover-images/46.jpg",
				audioUrl: "/songs/46.mp3",
				duration: 39,
			},
			{
				title: "Pal - Arijit Singh & Shreya Ghoshal",
				artist: "Arijit Singh, Shreya Ghoshal",
				imageUrl: "/cover-images/47.jpg",
				audioUrl: "/songs/47.mp3",
				duration: 27,
			},
			{
				title: "Pal - Arijit Singh",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/48.jpg",
				audioUrl: "/songs/48.mp3",
				duration: 36,
			},
			{
				title: "Pal Pal - Arijit Singh",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/49.jpg",
				audioUrl: "/songs/49.mp3",
				duration: 39,
			},
			{
				title: "Pehla Pyaar - Kabir Singh",
				artist: "Vishal Mishra",
				imageUrl: "/cover-images/50.jpg",
				audioUrl: "/songs/50.mp3",
				duration: 39,
			},
			{
				title: "Pehli Dafa - Atif Aslam",
				artist: "Atif Aslam",
				imageUrl: "/cover-images/51.jpg",
				audioUrl: "/songs/51.mp3",
				duration: 29,
			},
			{
				title: "Shayad - Love Aaj Kal",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/52.jpg",
				audioUrl: "/songs/52.mp3",
				duration: 29,
			},
			{
				title: "Raatan Lambiyan",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/53.jpg",
				audioUrl: "/songs/53.mp3",
				duration: 214,
			},
			{
				title: "Rabba Mehar Kari",
				artist: "Darshan Raval",
				imageUrl: "/cover-images/54.jpg",
				audioUrl: "/songs/54.mp3",
				duration: 42,
			},
			{
				title: "Sab Tera",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/55.jpg",
				audioUrl: "/songs/55.mp3",
				duration: 269,
			},
			{
				title: "Saware",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/56.jpg",
				audioUrl: "/songs/56.mp3",
				duration: 195,
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
				songs: createdSongs.slice(0, 15).map((song) => song._id), // First 7 songs
			},
			{
				title: "Chill Vibes",
				artist: "Various Artists",
				imageUrl: "/albums/2.png",
				releaseYear: 2024,
				songs: createdSongs.slice(16, 29).map((song) => song._id), // Next 5 songs
			},
			{
				title: "Night Sessions",
				artist: "Various Artists",
				imageUrl: "/albums/3.png",
				releaseYear: 2024,
				songs: createdSongs.slice(17, 45).map((song) => song._id), // Next 4 songs
			},
			{
				title: "Urban Dreams",
				artist: "Various Artists",
				imageUrl: "/albums/4.png",
				releaseYear: 2023,
				songs: createdSongs.slice(46, 56).map((song) => song._id), // Last 2 songs
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