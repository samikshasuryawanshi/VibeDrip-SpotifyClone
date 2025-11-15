import { axiosInstance } from '@/lib/axios';
import type { Messages, User } from '@/types';
import { create } from 'zustand';
import { io } from 'socket.io-client';

interface ChatStore {
    users: any[];
    isLoading: boolean;
    error: string | null;
    socket: any;
    isConnected: boolean;
    onlineUsers: Set<string>;
    userActivities: Map<string, string>;
    messages: Messages[];
    selectedUser: User | null;

    fetchUsers: () => Promise<void>;
    initSocket: (userId: string) => void;
    disconnectSocket: () => void;
    sendMessage: (receiverId: string, senderId: string, content: string) => void;
    fetchMessages: (userId: string) => Promise<void>;
    setSelectedUser: (user: User | null) => void;
}

const baseURL = "http://localhost:5000";

const socket = io(baseURL, {
    autoConnect: false,
    withCredentials: true,
});

// ⏳ Remove messages older than 24 hours
const filterExpiredMessages = (messages: Messages[]) => {
    const now = Date.now();

    return messages.filter((msg) => {
        const age = now - new Date(msg.createdAt).getTime();
        return age < 24 * 60 * 60 * 1000; // 24 hours
    });
};

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: socket,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    selectedUser: null,

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/users");
            set({ users: response.data.users });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Failed to fetch users",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    initSocket: (userId) => {
        if (!get().isConnected) {
            socket.auth = { userId };
            socket.connect();

            socket.emit("user_connected", userId);

            socket.on("users_online", (users: string[]) => {
                set({ onlineUsers: new Set(users) });
            });

            socket.on("activities", (activities: [string, string][]) => {
                set({ userActivities: new Map(activities) });
            });

            socket.on("user_connected", (userId: string) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId]),
                }));
            });

            socket.on("user_disconnected", (userId: string) => {
                set((state) => {
                    const updated = new Set(state.onlineUsers);
                    updated.delete(userId);
                    return { onlineUsers: updated };
                });
            });

            // 🟢 Incoming message (real-time)
            socket.on("receive_message", (message: Messages) => {
                set((state) => ({
                    messages: filterExpiredMessages([...state.messages, message]),
                }));
            });

            // 🟢 Message I sent (real-time)
            socket.on("message_sent", (message: Messages) => {
                set((state) => ({
                    messages: filterExpiredMessages([...state.messages, message]),
                }));
            });

            socket.on("activity_updated", (userId, activity) => {
                set((state) => {
                    const newMap = new Map(state.userActivities);
                    newMap.set(userId, activity);
                    return { userActivities: newMap };
                });
            });

            set({ isConnected: true });
        }
    },

    disconnectSocket: () => {
        if (get().isConnected) {
            socket.disconnect();
            set({ isConnected: false });
        }
    },

    sendMessage: async (receiverId, senderId, content) => {
        const socket = get().socket;
        if (!socket) return;

        socket.emit("send_message", { receiverId, senderId, content });
    },

    fetchMessages: async (userId: string) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get(`/users/messages/${userId}`);

            // cleanup old messages before setting state
            const cleaned = filterExpiredMessages(response.data);

            set({ messages: cleaned });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Failed to load messages",
            });
        } finally {
            set({ isLoading: false });
        }
    },
}));
