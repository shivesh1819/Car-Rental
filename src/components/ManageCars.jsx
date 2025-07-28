import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ManageCars = ({ onNavigate }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const [editingCar, setEditingCar] = useState(null);

  // Load cars from localStorage
  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
      setCars(savedCars);
      setLoading(false);
    };
    
    loadCars();
  }, []);

  // Filter cars based on search and filters
  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.color.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || car.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || car.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleDelete = async (carId) => {
    const carToDelete = cars.find(car => car.id === carId);
    if (window.confirm(`Are you sure you want to delete ${carToDelete?.year} ${carToDelete?.make} ${carToDelete?.model}?`)) {
      const updatedCars = cars.filter(car => car.id !== carId);
      setCars(updatedCars);
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      toast.success('Car deleted successfully');
    }
  };

  const handleSave = (updatedCar) => {
    const updatedCars = cars.map(car => car.id === updatedCar.id ? updatedCar : car);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setEditingCar(null);
    toast.success('Car updated successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Rented':
        return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Manage Cars</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          View, edit, and manage your rental fleet
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Cars</label>
            <input
              type="text"
              placeholder="Search by make, model, license plate, or color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="Mid-size">Mid-size</option>
              <option value="Full-size">Full-size</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading cars...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">
              {cars.length === 0 ? 'No cars in your fleet yet.' : 'No cars match your search criteria.'}
            </p>
            {cars.length === 0 && (
              <button
                onClick={() => onNavigate('addCars')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Your First Car
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Day
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
                {filteredCars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {car.year} {car.make} {car.model}
                        </div>
                        <div className="text-sm text-gray-500">{car.color}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{car.licensePlate}</div>
                        <div className="text-sm text-gray-500">{car.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${car.pricePerDay}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(car.status)}`}>
                          {car.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(car)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">Total Cars</div>
          <div className="text-2xl font-bold">{cars.length}</div>
          <div className="text-xs text-gray-400 mt-1">In Fleet</div>
        </div>
        <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">Available</div>
          <div className="text-2xl font-bold text-green-600">
            {cars.filter(car => car.status === 'Available').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Ready to Rent</div>
        </div>
        <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">Currently Rented</div>
          <div className="text-2xl font-bold text-yellow-600">
            {cars.filter(car => car.status === 'Rented').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Active Rentals</div>
        </div>
        <div className="bg-white border p-4 rounded shadow text-center hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">Maintenance</div>
          <div className="text-2xl font-bold text-red-600">
            {cars.filter(car => car.status === 'Maintenance').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Under Service</div>
        </div>
      </div>

      {/* Results Summary */}
      {(searchTerm || filterStatus !== 'All' || filterCategory !== 'All') && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredCars.length} of {cars.length} cars
          {searchTerm && ` matching "${searchTerm}"`}
          {filterStatus !== 'All' && ` with status "${filterStatus}"`}
          {filterCategory !== 'All' && ` in category "${filterCategory}"`}
        </div>
      )}

      {/* Edit Modal - Simple implementation */}
      {editingCar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Car</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSave(editingCar);
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editingCar.status}
                  onChange={(e) => setEditingCar({...editingCar, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day ($)</label>
                <input
                  type="number"
                  value={editingCar.pricePerDay}
                  onChange={(e) => setEditingCar({...editingCar, pricePerDay: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingCar(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
