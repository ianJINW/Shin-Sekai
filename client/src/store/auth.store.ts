import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id?: string;
  _id?: string;
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
}

const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
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


    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
      }),

    }
  )
);

export default useAuthStore;
