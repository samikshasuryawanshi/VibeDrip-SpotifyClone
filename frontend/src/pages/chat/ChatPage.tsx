import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo } from "react";
import { UserList } from "./components/UserList";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";

// simple safe formatter
const formatTime = (date) =>
	new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatPage = () => {
	const { user } = useUser();
	const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

	// Load user list
	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	// Load messages when selecting a new chat
	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);

	// 💀 Filter out messages older than 24 hours (safety layer)
	const filteredMessages = useMemo(() => {
		const now = Date.now();
		return messages.filter((msg) => {
			const age = now - new Date(msg.createdAt).getTime();
			return age < 24 * 60 * 60 * 1000; // 24 hours
		});
	}, [messages]);

	return (
		<main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
			<Topbar />

			<div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
				<UserList />

				{/* Chat Section */}
				<div className="flex flex-col h-full">
					{selectedUser ? (
						<>
							<ChatHeader />

							{/* ⚠️ 24-hour warning */}
							<div className="px-4 py-2 text-center text-xs text-zinc-400">
								⚠️ Messages are automatically deleted after 24 hours
							</div>

							{/* Messages list */}
							<ScrollArea className="h-[calc(100vh-340px)]">
								<div className="p-4 space-y-4">

									{filteredMessages.length === 0 && (
										<p className="text-center text-zinc-500 text-sm py-6">
											All older messages expired after 24 hours.
										</p>
									)}

									{filteredMessages.map((message) => {
										const isMe = message.senderId === user?.id;

										return (
											<div
												key={message._id}
												className={`flex items-start gap-3 ${
													isMe ? "flex-row-reverse" : ""
												}`}
											>
												{/* Avatar */}
												<div className="relative">
													<img
														src={
															isMe
																? user?.imageUrl
																: selectedUser?.imageUrl
														}
														alt={
															isMe
																? user?.fullName
																: selectedUser?.fullName
														}
														className="size-10 rounded-full object-cover"
													/>
												</div>

												{/* Message bubble */}
												<div
													className={`rounded-lg p-3 max-w-[70%] ${
														isMe
															? "bg-green-500 text-black"
															: "bg-zinc-800"
													}`}
												>
													<p className="text-sm">{message.content}</p>
													<span className="text-xs text-zinc-300 mt-1 block">
														{formatTime(message.createdAt)}
													</span>
												</div>
											</div>
										);
									})}

								</div>
							</ScrollArea>

							<MessageInput />
						</>
					) : (
						<NoConversationPlaceholder />
					)}
				</div>
			</div>
		</main>
	);
};

export default ChatPage;

const NoConversationPlaceholder = () => (
	<div className="flex flex-col items-center justify-center h-full space-y-6">
		<img src="/vibeDrip.png" alt="Spotify" className="size-16 animate-bounce" />
		<div className="text-center">
			<h3 className="text-zinc-300 text-lg font-medium mb-1">
				No conversation selected
			</h3>
			<p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
		</div>
	</div>
);
