import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./contexts/UserContext";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Group from "./pages/group/Group";
import Groups from "./pages/group/Groups";
import Explore from "./pages/Explore";
// Remove unused import
import AnimeList from "./pages/anime/AnimeList";
import AnimeDetails from "./pages/anime/AnimeDetails";
import EpisodeWatch from "./pages/anime/EpisodeWatch";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Rregister";
import Landing from "./pages/Landing";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/groups"
                element={
                  <ProtectedRoute>
                    <Groups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/groups/:groupId"
                element={
                  <ProtectedRoute>
                    <Group />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/anime"
                element={
                  <ProtectedRoute>
                    <AnimeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/anime/:animeId"
                element={
                  <ProtectedRoute>
                    <AnimeDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/anime/:animeId/episode/:episodeNumber"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <EpisodeWatch />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Redirect to landing for unmatched routes */}
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
