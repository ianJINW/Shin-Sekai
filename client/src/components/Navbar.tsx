import type React from "react";
import useUIStore from "../store/ui.store";
import { NavLink } from 'react-router-dom';
import logo from '../assets/react.svg'
import { HomeIcon, MoonIcon, Sun } from 'lucide-react';
import Button from "./ui/button";
import Tooltip from "./Tooltip";

const Navbar: React.FC = () => {
  const isDark = useUIStore(s => s.isDark)
  const dark = useUIStore(s => s.darkToggle)

  return (
    <header className="container mx-auto flex flex-row ixed top-0 left-0 w-full fixed top-0 justify-between item-center  p-3">
      <img src={logo} alt="Logo" />
      <nav className="flex flex-row items-center justify-evenly  gap-2">
        <Tooltip tooltip="Welcome home">
          <NavLink to='/' className={({ isActive }) => isActive ? "active" : ""} >
            <HomeIcon />
          </NavLink>
        </Tooltip>

        <NavLink to='/about' className={({ isActive }) => isActive ? "active" : ""} >
          Home
        </NavLink>
      </nav>

      <Button onClick={dark} variant="primary" className="" >{isDark ? <Sun />
        : <MoonIcon />}</Button>
    </header>
  )
}

export default Navbar