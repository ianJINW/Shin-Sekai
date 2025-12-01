import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
	return (

		<nav>
			<NavLink to='/' className={({ isActive }) => isActive ? "active" : ""} >Home</NavLink>
			<NavLink to='/about' className={({ isActive }) => isActive ? "active" : ""}>
				About
			</NavLink>
			<NavLink to='/login' className={({ isActive }) => isActive ? "active" : ""}>
				Log in
			</NavLink>
			<NavLink to='/register' className={({ isActive }) => isActive ? "active" : ""}>
				Register
			</NavLink>
			<NavLink to='/groups' className={({ isActive }) => isActive ? "active" : ""}>
				Groups
			</NavLink>
		</nav>
	);
};

export default Navbar;
