import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface User {
  id: string
  username: string
  email: string
  role: string
  image: string
}

export interface Loginres {
  user: User
  token: string
}

export interface UserStore {
  user: User | null,
  isAuth: boolean,
  isAdmin: boolean,
  login: (res: Loginres) => void
  logout: () => void
}

export interface LoginReq {
  email: string
  password: string
}

const useAuthStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      isAuth: false,
      isAdmin: false,

      login: (res: Loginres) => {
        const { user } = res
        if (!user) { console.error('No user data'); return }

        if (!user.id || !user.email || !user.role) {
          console.error("Missing required user fields:", {
            id: !!user.id,
            email: !!user.email,
            role: !!user.role,
            username: !!user.username,
            image: !!user.image
          });
          return;
        }

        set({
          user: user,
          isAuth: true
        })
      },
      logout: () => {
        set({ user: null, isAuth: false })
      },
    }), {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),

    partialize: (state) => ({ user: state.user, isAuth: state.isAuth, isAdmin: state.isAdmin }),
    onRehydrateStorage: () => {
      return () => {
        console.log('Rehydrated');
      }
    }
  })
)

export default useAuthStore