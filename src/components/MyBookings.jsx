import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const allBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");

        if (loggedInUser?.email) {
            const userBookings = allBookings.filter(
                booking => booking.email === loggedInUser.email
            );
            setBookings(userBookings);
        }
    };

    const cancelBooking = (bookingId) => {
        const allBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
        const updatedBookings = allBookings.filter(b => b.bookingId !== bookingId);

        localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
        fetchBookings(); // Refresh local state
        toast.success("Booking cancelled successfully!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map(booking => (
                        <div
                            key={booking.bookingId}
                            className="border p-4 rounded-lg shadow-md bg-white"
                        >
                            <img
                                src={booking.car.image}
                                alt={booking.car.name}
                                className="w-full h-40 object-contain mb-4"
                            />
                            <h2 className="text-xl font-semibold">{booking.car.name}</h2>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Location:</strong> {booking.car.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Pickup:</strong> {booking.pickupDate}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Return:</strong> {booking.returnDate}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Amount Paid:</strong> ₹{booking.amountPaid}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Payment ID:</strong> {booking.paymentId}
                            </p>
                            <p className="text-xs text-gray-500 mb-2">
                                <strong>Booked At:</strong> {new Date(booking.bookedAt).toLocaleString()}
                            </p>
                            <button
                                onClick={() => cancelBooking(booking.bookingId)}
                                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
