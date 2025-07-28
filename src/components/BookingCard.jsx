import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import carImage from '../assets/main_car.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookingCard = () => {
    const [location, setLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSearch = () => {
        try {
            const filters = {
                location,
                pickupDate,
                returnDate
            };

            localStorage.setItem('carFilters', JSON.stringify(filters));

            if (!user) {
                toast.error("Please login to continue");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
                return;
            }

            window.dispatchEvent(new Event("filtersChanged"));
            navigate('/availableCars');
        } catch (error) {
            console.error("Error during search:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="bg-[#f5f9ff] py-16 px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                Luxury cars on Rent
            </h1>

            <div className="grid sm:grid-cols-1 md:grid-cols-4 md:rounded-full
                max-w-5xl mx-auto bg-white rounded shadow-lg p-4 px-6 items-center justify-between gap-4">
                
                <div className="flex flex-col text-left">
                    <label className="text-sm font-medium text-gray-600">Pickup Location</label>
                    <select
                        className="text-sm text-gray-500 focus:outline-none bg-transparent"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="">Please select location</option>
                        <option value="New York">New York</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                    </select>
                </div>

                <div className="flex flex-col text-left">
                    <label className="text-sm font-medium text-gray-600">Pick-up Date</label>
                    <div className="flex items-center gap-2 text-gray-500">
                        <FaCalendarAlt className="text-gray-400" />
                        <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="text-sm bg-transparent focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col text-left">
                    <label className="text-sm font-medium text-gray-600">Return Date</label>
                    <div className="flex items-center gap-2 text-gray-500">
                        <FaCalendarAlt className="text-gray-400" />
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="text-sm bg-transparent focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition"
                >
                    <FaSearch />
                    Search
                </button>
            </div>

            <div className="mt-12">
                <img
                    src={carImage}
                    alt="Luxury Car"
                    className="mx-auto w-[90%] max-w-4xl object-contain"
                />
            </div>
        </section>
    );
};

export default BookingCard;
