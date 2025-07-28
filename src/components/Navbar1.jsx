import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/011/514/537/small/modern-car-rental-logo-template-racing-car-silhouette-simple-line-car-illustration-vector.jpg"
              alt="Car Rental Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">Car Rental</span>
          </div>
        </div>

        {/* Right side - Show logged in user's name */}
        <div className="flex items-center">
          {loggedInUser ? (
            <span className="text-lg font-medium text-gray-700">{loggedInUser.name}</span>
          ) : (
            <span className="text-lg text-gray-500 italic">Guest</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
