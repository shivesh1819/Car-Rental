import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CarDetails = () => {
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [car, setCar] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!selectedCar) {
            alert("No car selected. Redirecting to home.");
            navigate('/');
            return;
        }
        setCar(selectedCar);
        setUser(savedUser);
    }, []);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

 const bookNow = async () => {
    const razorpayKey = localStorage.getItem('razorpayKey') || import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
        alert("Razorpay Key not found!");
        return;
    }

    if (!pickupDate || !returnDate) {
        alert("Please select pickup and return dates.");
        return;
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const numDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (isNaN(numDays) || numDays <= 0) {
        alert("Invalid date range.");
        return;
    }

    const scriptLoaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!scriptLoaded) {
        alert("Failed to load Razorpay. Check internet connection.");
        return;
    }

    const totalAmount = Math.ceil(numDays * car.price * 100); // in paisa

    const options = {
        key: razorpayKey,
        amount: totalAmount,
        currency: 'INR',
        name: 'Car Rental Booking',
        description: `Booking for ${car.name}`,
        handler: function (response) {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            const userEmail = loggedInUser?.email || "guest@example.com";

            const booking = {
                bookingId: Date.now(),
                carId: car._id || car.id || Math.random().toString(36).substr(2, 9),
                car,
                user: loggedInUser?.name || "Guest",
                email: userEmail,
                pickupDate,
                returnDate,
                amountPaid: (totalAmount / 100).toFixed(2),
                paymentId: response.razorpay_payment_id,
                bookedAt: new Date().toISOString()
            };

            // Get existing bookings as an array
            const existingBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
            const updatedBookings = [...existingBookings, booking];

            localStorage.setItem("myBookings", JSON.stringify(updatedBookings));

            alert("✅ Booking successful!");
            navigate('/my-bookings');
        },
        prefill: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com"
        },
        theme: { color: '#1D4ED8' },
        modal: {
            ondismiss: function () {
                alert("Payment popup closed.");
            }
        }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};



    const handleCancel = () => {
        navigate('/');
    };

    if (!car) return <div className="p-6 text-center">Loading car details...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6 ">
            <img src={car.image} alt={car.name} className="w-full h-64 object-contain mb-4" />
            <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
            <p className="text-gray-700 mb-4">
                {car.type} | {car.seats || '4'} Seats | {car.fuel}
            </p>
            <p className="text-sm text-gray-600 mb-2">
                From: {car.pickup || 'N/A'} → To: {car.drop || 'N/A'}
            </p>
            <p className="text-lg text-green-600 font-semibold mb-4">
                ₹{car.price} / day
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Pickup Date</label>
                    <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="border rounded px-3 py-2 sm:w-[40vw] md:w-[30vw] lg:w-[17vw] xl:w-[10vw]"
                    />
                </div>
                <div >
                    <label className="block text-sm font-medium mb-1">Return Date</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="border rounded px-3 py-2 sm:w-[40vw] md:w-[30vw] lg:w-[17vw] xl:w-[10vw]"
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <button
                    onClick={bookNow}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Book Now with Razorpay
                </button>
                </div>
                <div>
                    <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                >
                    Cancel
                </button>
                </div>
                
                
            </div>
        </div>
    );
};

export default CarDetails;
