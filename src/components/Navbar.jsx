// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo1.png";
import { Avatar } from "@mui/material";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // 🚀 Import Framer Motion

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return (words[0][0] + (words[1]?.[0] || "")).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-10 h-10" alt="Logo" />
          <span className="text-2xl font-bold text-blue-700">CarRental</span>
        </div>

        {/* Hamburger button (mobile) */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth >= 640) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`flex-col sm:flex sm:flex-row sm:items-center sm:gap-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent px-4 sm:px-0 py-4 sm:py-0 shadow-md sm:shadow-none z-40 ${
                isMenuOpen ? "flex" : "hidden sm:flex"
              }`}
            >
              {user ? (
                <>
                  <Link
                    to="/"
                    className="text-blue-600 font-medium hover:underline block py-2 sm:py-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/availableCars"
                    className="text-blue-600 font-medium hover:underline block py-2 sm:py-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Available Cars
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="text-blue-600 font-medium hover:underline block py-2 sm:py-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MyBooking
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-blue-600 font-medium hover:underline block py-2 sm:py-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Avatar
                      sx={{
                        bgcolor: "#1d4ed8",
                        width: 40,
                        height: 40,
                        fontSize: 16,
                      }}
                    >
                      {getInitials(user.name)}
                    </Avatar>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition ml-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center mt-2 sm:mt-0">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto mr-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto ml-4">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

