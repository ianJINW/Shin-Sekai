import type { FC } from "react";
import { useState } from "react";
import useUIStore from "../store/ui.store";
import logo from "../assets/react.svg";
import Tooltip from "./Tooltip";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import navLinks from "./exports";

const Sidebar: FC = () => {
  const sidebarOpen = useUIStore((s) => s.sidebar);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const [isClient] = useState(() => typeof window !== "undefined");



  return (
    <>
      {/* Mobile sidebar (overlay) */}
      {isClient && sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 max-w-full h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <img src={logo} alt="App logo" className="h-8 w-8" />
              <button aria-label="Close menu" onClick={toggleSidebar} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ to, label, Icon }) => (
                <Tooltip key={to} tooltip={label}>
                  <NavLink
                    to={to}
                    onClick={() => {
                      // close on mobile after navigation
                      toggleSidebar();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "bg-gray-100 dark:bg-gray-800 font-semibold" : "text-gray-700 dark:text-gray-300"
                      }`
                    }
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </NavLink>
                </Tooltip>
              ))}
            </nav>
          </div>
          <div onClick={toggleSidebar} className="flex-1 bg-black/40" />
        </div>
      )}
    </>
  );
};

export default Sidebar;