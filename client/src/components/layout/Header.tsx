import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Film,
  Home,
  Compass,
  Users,
  Bookmark,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useTheme } from "next-themes";
import { currentUser } from "../../lib/data";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Groups", path: "/groups", icon: Users },
    { name: "Anime", path: "/anime", icon: Film },
    { name: "Saved", path: "/saved", icon: Bookmark },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-anime-primary">AnimeHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`p-2 rounded-md flex items-center gap-2 ${
                location.pathname === link.path
                  ? "bg-primary/10 text-anime-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Profile */}
          <Link to="/profile" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={currentUser.avatar}
                alt={currentUser.displayName}
              />
              <AvatarFallback>
                {currentUser.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border">
          <nav className="flex flex-col p-4 gap-2 bg-background animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`p-2 rounded-md flex items-center gap-2 ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-anime-primary"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
