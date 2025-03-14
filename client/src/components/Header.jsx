import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContextObj } from "../Context/UserContext";
import { FiMoon, FiSun, FiBell, FiUser } from "react-icons/fi"; // Icons for better UI
import { HiMenu, HiX } from "react-icons/hi"; // Mobile Menu Icons

function Header() {
  const { loginStatus, currentUser, logout } = useContext(UserContextObj);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <nav className="shadow-md p-3 bg flex justify-between items-center">
      {/* Left: Logo & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-xl">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
        <Link to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6i_Bqt1ikPrm8mYonHO9UP_3Jm_JlBEt2eA&s"
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className={`lg:flex gap-6 items-center ${menuOpen ? "flex flex-col" : "hidden lg:flex"}`}>
        <NavLink className="nav-link hover:text-blue-600" to="/">Home</NavLink>
        <NavLink className="nav-link hover:text-blue-600" to="#">About</NavLink>
        <NavLink className="nav-link hover:text-blue-600" to="#">Services</NavLink>
        <NavLink className="nav-link hover:text-blue-600" to="#">Contact</NavLink>
      </div>

      {/* Right: Search, Theme Toggle, Notifications, and User Menu */}
      <div className="flex items-center gap-4">
        {/* Search Bar
        <input
          type="text"
          placeholder="Search..."
          className="hidden lg:block p-1 rounded-lg border border-gray-300 focus:outline-none"
        /> */}

        {/* Theme Toggle */}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-xl">
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Notifications
        <button className="text-xl relative">
          <FiBell />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button> */}

        {/* User Section */}
        {currentUser ? (
          <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2">
              <FiUser />
              <span>{currentUser.username}</span>
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink>
                <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</NavLink>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-100">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <NavLink className="nav-link hover:text-blue-600" to="/login">Login</NavLink>
            <NavLink className="nav-link hover:text-blue-600" to="/signup">Signup</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
