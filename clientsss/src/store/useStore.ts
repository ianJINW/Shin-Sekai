import { create } from "zustand";

// Define the store interface
export interface AppState {
  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Define types
export interface Notification {
  id: string;
  type: "friend-request" | "like" | "comment" | "recommendation" | "system";
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Create the store
export const useStore = create<AppState>((set) => ({
  // Theme (defaults to system)
  theme: "system",
  setTheme: (theme) => set({ theme }),

  // Notifications (starts empty)
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearAllNotifications: () => set({ notifications: [] }),

  // Sidebar (starts closed on mobile, open on desktop)
  isSidebarOpen: window.innerWidth >= 1024,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

// Optional: Add persistence
// You can add persistence to the store using middleware
// This is a simple example that uses localStorage
export const usePersistentStore = create<AppState>((set) => ({
  // Same state as above but initialize from localStorage if available
  theme:
    (localStorage.getItem("theme") as "light" | "dark" | "system") || "system",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },

  // Rest of the state (not persisted in this example)
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearAllNotifications: () => set({ notifications: [] }),

  isSidebarOpen: window.innerWidth >= 1024,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
