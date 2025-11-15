import { Server } from "socket.io";
import { Message } from "../models/messageModel.js";

export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	});

	// Maps Clerk userId → socket.id
	const userSockets = new Map();
	const userActivities = new Map();

	io.on("connection", (socket) => {
		// console.log("⚡ New socket connected:", socket.id);

		socket.on("user_connected", (userId) => {
			// console.log("✅ User connected:", userId);
			userSockets.set(userId, socket.id);
			userActivities.set(userId, "Idle");

			io.emit("user_connected", userId);
			socket.emit("users_online", Array.from(userSockets.keys()));
			io.emit("activities", Array.from(userActivities.entries()));
		});

		socket.on("update_activity", (userId, activity) => {
			userActivities.set(userId, activity);
			io.emit("activities", { userId, activity });
		});

		socket.on("send_message", async (data) => {
	try {
		// match schema spelling
		const { senderId, receiverId: recieverId, content } = data;

		if (!senderId || !recieverId || !content) {
			console.warn("❌ Invalid message payload:", data);
			return;
		}

		// Save correctly to DB
		const message = await Message.create({
			senderId,
			recieverId, // <-- your schema field
			content,
		});

		const receiverSocketId = userSockets.get(recieverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("receive_message", message);
		}

		socket.emit("message_sent", message);
	} catch (error) {
		console.log("Message error:", error);
		socket.emit("message_error", error.message);
	}
});


		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}

			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
				// console.log("❌ User disconnected:", disconnectedUserId);
			}
		});
	});
};
