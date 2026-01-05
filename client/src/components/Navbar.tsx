import { type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MoonIcon,
  MenuIcon,
  Sun,
  LogOutIcon,
  UserIcon,
} from "lucide-react";

import useUIStore from "../store/ui.store";
import useAuthStore from "../store/auth.store";
import { LogoutUser } from "../lib/apiRequests";
import useIdle from "../hooks/useIdle";
import logo from "../assets/react.svg";
import Button from "./ui/button";
import navLinks from "./exports";

const Navbar: FC = () => {
  const isDark = useUIStore((s) => s.isDark);
  const toggleDark = useUIStore((s) => s.darkToggle);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const sidebarOpen = useUIStore((s) => s.sidebar);

  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuth);
  const navigate = useNavigate();

  const idle = useIdle(3000);

  const { mutate: logoutMutate } = LogoutUser('/api/v1/user/logout')

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300"
      style={{
        transform: idle ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.25s ease",
      }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <img src={logo} alt="App logo" className="h-8 w-8" />

        <nav className="hidden lg:flex items-center space-x-4">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive
                  ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
                }`
              }
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <MenuIcon
              className={`h-5 w-5 transform transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""
                }`}
            />
          </Button>

          <Button
            onClick={toggleDark}
            variant="secondary"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={isDark ? "Switch to light" : "Switch to dark"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>

          {isAuth ? (
            <Button
              onClick={() =>
                logoutMutate(undefined, {
                  onSuccess: () => navigate('/'),
                })
              }
              variant="secondary"
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOutIcon className="h-5 w-5" />
            </Button>
          ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                Sign In
              </NavLink>
                <NavLink
                  to="/register"
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                Sign Up
              </NavLink>
              </>
          )}

          {isAuth ? (
            <img
              onClick={() => navigate("/profile")}
              src={user?.image}
              alt="User avatar"
              className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700"
            />
          ) : (
            <UserIcon className="h-6 w-6" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
