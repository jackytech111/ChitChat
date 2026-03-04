import { userService } from "@/services/userService";
import type { UserState } from "@/types/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useChatStore } from "./useChatStore";
import { AxiosError } from "axios";

export const useUserStore = create<UserState>(() => ({
  updateAvatarUrl: async (formData) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      const data = await userService.uploadAvatar(formData);

      if (!user) {
        return;
      }

      setUser({
        ...user,
        avatarUrl: data.avatarUrl,
      });

      await useChatStore.getState().fetchConversations();
      toast.success("Upload avatar thành công");
    } catch (error) {
      console.error("Lỗi khi updateAvatarUrl", error);

      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Upload avatar không thành công!";
        toast.error(message);
        return;
      }

      toast.error("Upload avatar không thành công!");
    }
  },
}));
