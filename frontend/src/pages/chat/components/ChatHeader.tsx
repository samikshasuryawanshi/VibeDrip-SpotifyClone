import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
    const { selectedUser, onlineUsers } = useChatStore();

    if (!selectedUser) return null;

    return (
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">

            {/* Avatar + Online indicator */}
            <div className="relative">
                <img
                    src={selectedUser.imageUrl}
                    alt={selectedUser.fullName}
                    className="size-10 rounded-full object-cover"
                />

                {/* <div
                    className={`
                        absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                        ${onlineUsers.has(selectedUser.clerkId)
                            ? "bg-green-500"
                            : "bg-zinc-500"}
                    `}
                /> */}
            </div>

            {/* Name + status */}
            <div className="flex flex-col">
                <h2 className="font-medium text-zinc-100">{selectedUser.fullName}</h2>
                <p className="text-xs text-zinc-400">
                    {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
                </p>
            </div>

        </div>
    );
};

export default ChatHeader;
