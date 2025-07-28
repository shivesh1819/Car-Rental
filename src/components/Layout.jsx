import React, { useState } from "react";
import Navbar1 from "./Navbar1";

const Layout = ({ children, onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <Navbar1 />

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b px-4 py-2">
        <button
          onClick={toggleMobileMenu}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menu
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-120px)]">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r shadow-sm">
          <div className="p-5">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="rounded-full w-20 h-20 mb-2"
              />
              <h2 className="text-lg font-semibold">Ashutosh</h2>
            </div>

            <nav className="mt-8 space-y-2 w-full">
              <button
                onClick={() => onNavigate("dashboard")}
                className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                  currentPage === "dashboard"
                    ? "text-blue-600 font-semibold bg-blue-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => onNavigate("addCars")}
                className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                  currentPage === "addCars"
                    ? "text-blue-600 font-semibold bg-blue-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ➕ Add Car
              </button>
              <button
                onClick={() => onNavigate("manageCars")}
                className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                  currentPage === "manageCars"
                    ? "text-blue-600 font-semibold bg-blue-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                🚗 Manage Cars
              </button>
              <button
                onClick={() => onNavigate("manageBookings")}
                className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                  currentPage === "manageBookings"
                    ? "text-blue-600 font-semibold bg-blue-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                📅 Manage Bookings
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={toggleMobileMenu}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex flex-col items-center px-4">
                  <img
                    src="https://via.placeholder.com/60"
                    alt="Profile"
                    className="rounded-full w-16 h-16 mb-2"
                  />
                  <h2 className="text-lg font-semibold">Ashutosh</h2>
                </div>
                <nav className="mt-8 px-4 space-y-2">
                  <button
                    onClick={() => {
                      onNavigate("dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                      currentPage === "dashboard"
                        ? "text-blue-600 font-semibold bg-blue-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("addCars");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                      currentPage === "addCars"
                        ? "text-blue-600 font-semibold bg-blue-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    ➕ Add Car
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("manageCars");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                      currentPage === "manageCars"
                        ? "text-blue-600 font-semibold bg-blue-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    🚗 Manage Cars
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("manageBookings");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded w-full text-sm ${
                      currentPage === "manageBookings"
                        ? "text-blue-600 font-semibold bg-blue-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    📅 Manage Bookings
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto w-full lg:w-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
