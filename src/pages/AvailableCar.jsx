import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/BMWX5.png'
import img3 from '../assets/thar1.jpeg';
import img2 from '../assets/hondacivic.jpeg';
import img4 from '../assets/fortuner.jpeg';
import img5 from '../assets/innova.jpeg';
import img6 from '../assets/scorpio.jpeg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const carsData = [{
    id: 1,
    name: 'BMW X5',
    year: 2006,
    type: 'SUV',
    price: 10000,
    fuel: 'Hybrid',
    transmission: 'Semi-Automatic',
    location: 'New York',
    seats: 5,
    company: 'BMW',
    model: 'X5',
    image: img1,
  },
  {
    id: 2,
    name: 'Scorpio',
    year: 2023,
    type: 'SUV',
    price: 7000,
    fuel: 'Diesel',
    transmission: 'Manual',
    location: 'Delhi',
    seats: 5,
    company: 'Mahindra',
    model: 'X5',
    image: img6,
  },
  {
    id: 3,
    name: 'Innova',
    year: 2023,
    type: 'SUV',
    price: 7000,
    fuel: 'Diesel',
    transmission: 'Manual',
    location: 'Mumbai',
    seats: 5,
    company: 'Toyota',
    model: 'X5',
    image: img5,
  },{
    id: 4,
    name: 'Fortuner',
    year: 2023,
    type: 'SUV',
    price: 7000,
    fuel: 'Diesel',
    transmission: 'Manual',
    location: 'New York',
    seats: 5,
    company: 'Toyota',
    model: 'X5',
    image: img4,
  },{
    id: 5,
    name: 'hondacivic',
    year: 2023,
    type: 'sedan',
    price: 7000,
    fuel: 'Diesel',
    transmission: 'Manual',
    location: 'Delhi',
    seats: 5,
    company: 'Honda',
    model: 'X5',
    image: img2,
  },{
    id: 6,
    name: 'Mahindra Thar',
    year: 2023,
    type: 'SUV',
    price: 7000,
    fuel: 'Diesel',
    transmission: 'Manual',
    location: 'Mumbai',
    seats: 5,
    company: 'Mahindra',
    model: 'X5',
    image: img3,
  },
];

const AvailableCar = () => {
  const [filteredCars, setFilteredCars] = useState(carsData);
 const navigate = useNavigate();
const { user } = useAuth();


  const applyFilters = () => {
    const filters = JSON.parse(localStorage.getItem('carFilters')) || {};
    let filtered = carsData;

    if (filters.location) {
      filtered = filtered.filter(car => car.location?.toLowerCase() === filters.location.toLowerCase());
    }

    // You could add more advanced date filtering here if dates are associated with cars
    setFilteredCars(filtered);
  };

  useEffect(() => {
    applyFilters();

    const handleFilterChange = () => {
      applyFilters();
    };

    window.addEventListener("filtersChanged", handleFilterChange);

    return () => {
      window.removeEventListener("filtersChanged", handleFilterChange);
    };
  }, []);

  const groupBySeats = (cars) => {
    const grouped = {};
    cars.forEach((car) => {
      const key = `${car.seats}-Seater`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(car);
    });
    return grouped;
  };

  const carsBySeats = groupBySeats(filteredCars);

  const handleCardClick = (car) => {
  if (!user) {
    toast.error("Please login to book the car");
    navigate("/login");
    return;
  }

  try {
    localStorage.setItem("selectedCar", JSON.stringify(car));
    navigate("/CarDetails");
  } catch (err) {
    toast.error("Error saving booking data");
    console.error("Booking error:", err);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-sky-100 py-8 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-10">
        🚘 Browse Available Cars
      </h1>

      {Object.entries(carsBySeats).length === 0 ? (
        <p className="text-center text-gray-500">No cars available for selected filters.</p>
      ) : (
        Object.entries(carsBySeats).map(([seatType, cars]) => (
          <section key={seatType} className="mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">
              {seatType}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {cars.map((car) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={car.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 sm:h-52 object-cover"
                  />
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {car.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{car.company}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{car.model}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{car.fuel}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{car.seats} Seater</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-blue-700 mb-4">
                      ₹{car.price.toLocaleString()}/day
                    </div>
                    <button onClick={() => handleCardClick(car)} className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
  Book Now
</button>

                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default AvailableCar;
