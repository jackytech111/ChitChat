import { create } from "zustand";
import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import type { SocketState } from "@/types/store";
import { useChatStore } from "./useChatStore";

const baseURL = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],
  connectSocket: () => {
    const accessToken = useAuthStore.getState().accessToken;
    const existingSocket = get().socket;

    if (existingSocket) return; // tránh tạo nhiều socket

    const socket: Socket = io(baseURL, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });

    set({ socket });

    socket.on("connect", () => {
      console.log("Đã kết nối với socket");
    });

    // online users
    socket.on("online-users", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // new message
    socket.on("new-message", async ({ message, conversation, unreadCounts }) => {
      try {
        const chatStore = useChatStore.getState();
        const isKnownConversation = chatStore.conversations.some(
          (c) => c._id === conversation._id,
        );

        if (!isKnownConversation) {
          await chatStore.fetchConversations();
        }

        const lastMessage = {
          _id: conversation.lastMessage._id,
          content: conversation.lastMessage.content,
          createdAt: conversation.lastMessage.createdAt,
          sender: {
            _id: conversation.lastMessage.senderId,
            displayName: "",
            avatarUrl: null,
          },
        };

        const updatedConversation = {
          ...conversation,
          lastMessage,
          unreadCounts,
        };

        useChatStore.getState().upsertConversation(updatedConversation);
        useChatStore.getState().addMessage(message);

        if (
          useChatStore.getState().activeConversationId === message.conversationId
        ) {
          useChatStore.getState().markAsSeen();
        }
      } catch (error) {
        console.error("Socket new-message handler failed", error);
      }
    });

    // read message
    socket.on("read-message", ({ conversation, lastMessage }) => {
      const updated = {
        _id: conversation._id,
        lastMessage,
        lastMessageAt: conversation.lastMessageAt,
        unreadCounts: conversation.unreadCounts,
        seenBy: conversation.seenBy,
      };

      useChatStore.getState().upsertConversation(updated);
    });

    // new group chat
    socket.on("new-group", (conversation) => {
      useChatStore.getState().addConvo(conversation, { activate: false });
      socket.emit("join-conversation", conversation._id);
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
