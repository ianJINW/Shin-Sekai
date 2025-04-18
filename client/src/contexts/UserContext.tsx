import { createContext, useContext, useState, ReactNode } from "react";

// Define user type
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  favoriteGenres?: string[];
  favoriteAnime?: string[];
  following?: string[];
  followers?: string[];
}

// Context type
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: Partial<User>, password: string) => Promise<void>;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

// Custom hook for using the context
export const useUser = () => useContext(UserContext);

// Mock user for development
const mockUser: User = {
  id: "1",
  username: "anime_lover",
  displayName: "Anime Enthusiast",
  email: "anime@example.com",
  avatar:
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2070&auto=format&fit=crop",
  bio: "Passionate about anime and manga. Always looking for new series to watch!",
  favoriteGenres: ["Shonen", "Fantasy", "Action"],
  favoriteAnime: ["Attack on Titan", "Demon Slayer", "My Hero Academia"],
  following: ["2", "3"],
  followers: ["2", "4", "5"],
};

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Using mock user for development

  const login = async (username: string, password: string) => {
    // Mock login logic - would connect to backend in production
    console.log("Logging in with:", username, password);
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (user: Partial<User>, password: string) => {
    // Mock registration logic
    console.log("Registering user:", user, password);
    setUser({ ...mockUser, ...user });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
