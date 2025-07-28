import React, { useState } from 'react';

const ManageBookings = ({ onNavigate }) => {
  // Booking data - will be populated when bookings are made
  const [bookings, setBookings] = useState([]);

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Manage Bookings</h1>
          </div>

          <p className="text-gray-600 mb-6">
            View and manage customer bookings and reservations
          </p>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rental Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.carDetails}</div>
                        <div className="text-sm text-gray-500">{booking.licensePlate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </div>
                        <div className="text-sm text-gray-500">{booking.totalDays} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${booking.totalAmount}</div>
                        <div className="text-sm text-gray-500">${booking.pricePerDay}/day</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 mr-2"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-900 ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white border p-3 rounded shadow text-center">
              <div className="text-xs text-gray-500">Total Bookings</div>
              <div className="text-lg font-bold">{bookings.length}</div>
            </div>
            <div className="bg-white border p-3 rounded shadow text-center">
              <div className="text-xs text-gray-500">Pending</div>
              <div className="text-lg font-bold text-yellow-600">
                {bookings.filter(booking => booking.status === 'Pending').length}
              </div>
            </div>
            <div className="bg-white border p-3 rounded shadow text-center">
              <div className="text-xs text-gray-500">Confirmed</div>
              <div className="text-lg font-bold text-green-600">
                {bookings.filter(booking => booking.status === 'Confirmed').length}
              </div>
            </div>
            <div className="bg-white border p-3 rounded shadow text-center">
              <div className="text-xs text-gray-500">Total Revenue</div>
              <div className="text-lg font-bold text-blue-600">
                ${bookings.filter(booking => booking.status !== 'Cancelled')
                  .reduce((sum, booking) => sum + booking.totalAmount, 0)}
              </div>
            </div>
          </div>
    </div>
  );
};

export default ManageBookings;
