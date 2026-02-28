import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });

      // gọi api
      await authService.signUp(username, password, email, firstName, lastName);

      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển sang trạng thái đăng nhập!",
      );
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(email, password);
      set({ accessToken });

      await get().fetchMe();

      toast.success("Chào mừng bạn quay trở lại với ChitChat 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi đăng xuất. Hãy thử lại");
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null });
      toast.error("Lỗi xảy ra khi lấy dũ liệu người dùng. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },
}));
