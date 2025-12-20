import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getTimedGreetings } from "../components/exports";
import api from "../lib/api";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  image: string;
}

export interface Loginres {
  user: User;
  token: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface UserStore {
  user: User | null;
  isAuth: boolean;
  isAdmin: boolean;
  login: (res: Loginres) => void;
  logout: () => void;
  verifySession: () => Promise<void>;
}

const useAuthStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuth: false,
      isAdmin: false,

      login: (res: Loginres) => {
        const { user } = res;
        set({
          user,
          isAuth: true,
          isAdmin: user.role === "admin",
        });
        toast.success(`Logged in as ${user.username}`);
      },

      logout: () => {
        set({ user: null, isAuth: false, isAdmin: false });
        toast(`Logged out`);
      },

      verifySession: async () => {
        try {
          const res = await api.get('/api/v1/user/auth', {
            withCredentials: true,
          });
          get().login(res.data);
          const greeting = getTimedGreetings();
          toast.success(`${greeting?.phrase} ${res.data.user.username} Welcome!`);
        } catch (err) {
          toast.error(`Error verifying. ${err}`)
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, verify the session if user exists
        if (state?.user) {
          // Call verifySession after a short delay to ensure store is ready
          setTimeout(() => {
            useAuthStore.getState().verifySession();
          }, 100);
        }
      },
    }
  )
);

export default useAuthStore;
