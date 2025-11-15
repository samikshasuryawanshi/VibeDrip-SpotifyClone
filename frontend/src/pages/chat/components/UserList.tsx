import UsersListSkeleton from '@/components/skeletons/UsersListSkeleton'
import { useChatStore } from '@/stores/useChatStore'
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const UserList = () => {
    const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

    return (
        <div className="border-r border-zinc-800">
            <div className="flex flex-col h-full">

                {/* Scrollable User List */}
                <ScrollArea className="h-[calc(100vh-180px)] overflow-y-auto">

                    <div className="space-y-2 p-4">

                        {/* Skeleton when loading */}
                        {isLoading ? (
                            <UsersListSkeleton />
                        ) : (
                            users.map((user) => (
                                <div
                                    key={user._id}
                                    onClick={() => setSelectedUser(user)}

                                    // Selected & hover UI
                                    className={`
                                        flex items-center justify-center lg:justify-start gap-3 p-3
                                        rounded-lg cursor-pointer transition-colors
                                        ${selectedUser?.clerkId === user.clerkId
                                            ? "bg-zinc-600"        // highlighted
                                            : "hover:bg-zinc-800/50"} // hover effect
                                    `}
                                >

                                    {/* Avatar + Online Indicator */}
                                    <div className="relative">
                                        <img
                                            src={user.imageUrl}
                                            alt={user.fullName}
                                            className="size-10 rounded-full object-cover"
                                        />

                                        {/* Online / Offline dot */}
                                        <div
                                            className={`
                                                absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                                                ${onlineUsers.has(user.clerkId)
                                                    ? "bg-green-500"   // online
                                                    : "bg-zinc-500"}   // offline
                                            `}
                                        />
                                    </div>

                                    {/* User Name (Hidden on small screens) */}
                                    <div className="flex-1 min-w-0 lg:block hidden">
                                        <span className="font-medium truncate">
                                            {user.fullName}
                                        </span>
                                    </div>

                                </div>
                            ))
                        )}

                    </div>

                </ScrollArea>
            </div>
        </div>
    );
};
