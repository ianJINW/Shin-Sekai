import type { FC } from "react";
import { NavLink } from "react-router-dom";
import useUIStore from "../store/ui.store";
import logo from "../assets/react.svg";
import {
  MoonIcon,
  MenuIcon,
  Sun,
} from "lucide-react";
import Button from "./ui/button";
import navLinks from "./exports";

const Navbar: FC = () => {
  const isDark = useUIStore((s) => s.isDark);
  const toggleDark = useUIStore((s) => s.darkToggle);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const sidebarOpen = useUIStore((s) => s.sidebar);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="App logo" className="h-8 w-8" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "bg-gray-100 dark:bg-gray-800 font-semibold" : "text-gray-700 dark:text-gray-300"}`
              }
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Toggle */}
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
          >
            <MenuIcon
              className={`h-5 w-5 transform transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`}
            />
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            onClick={toggleDark}
            variant="secondary"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>

          {/* Avatar */}
          <img
            src={logo}
            alt="User avatar"
            className="h-6 w-6 rounded-full border border-gray-300 dark:border-gray-700"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;   