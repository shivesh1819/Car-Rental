import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddCars = ({ onNavigate }) => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    pricePerDay: '',
    category: 'Economy',
    status: 'Available',
    description: '',
    features: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Available car features
  const availableFeatures = [
    'Air Conditioning', 'GPS Navigation', 'Bluetooth', 'USB Ports',
    'Backup Camera', 'Heated Seats', 'Sunroof', 'Leather Seats',
    'Automatic Transmission', 'Manual Transmission', 'All-Wheel Drive',
    'Fuel Efficient', 'Premium Sound System', 'Keyless Entry'
  ];

  // Load recently added cars from localStorage
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    setRecentlyAdded(savedCars.slice(-3)); // Show last 3 added cars
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setCarData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!carData.make.trim()) newErrors.make = 'Make is required';
    if (!carData.model.trim()) newErrors.model = 'Model is required';
    if (!carData.year) newErrors.year = 'Year is required';
    if (carData.year < 1990 || carData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Year must be between 1990 and ' + (new Date().getFullYear() + 1);
    }
    if (!carData.color.trim()) newErrors.color = 'Color is required';
    if (!carData.licensePlate.trim()) newErrors.licensePlate = 'License plate is required';
    if (!carData.pricePerDay || carData.pricePerDay <= 0) {
      newErrors.pricePerDay = 'Price per day must be greater than 0';
    }
    
    // Check for duplicate license plate
    const existingCars = JSON.parse(localStorage.getItem('cars')) || [];
    if (existingCars.some(car => car.licensePlate.toLowerCase() === carData.licensePlate.toLowerCase())) {
      newErrors.licensePlate = 'License plate already exists';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new car object with ID and timestamp
      const newCar = {
        ...carData,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString(),
        pricePerDay: parseFloat(carData.pricePerDay)
      };
      
      // Save to localStorage (simulating backend)
      const existingCars = JSON.parse(localStorage.getItem('cars')) || [];
      const updatedCars = [...existingCars, newCar];
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      
      // Update recently added cars
      setRecentlyAdded(updatedCars.slice(-3));
      
      // Show success message
      toast.success(`${carData.year} ${carData.make} ${carData.model} added successfully!`);
      setShowSuccess(true);
      
      // Reset form
      setCarData({
        make: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        pricePerDay: '',
        category: 'Economy',
        status: 'Available',
        description: '',
        features: []
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      toast.error('Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Add New Car</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Add a new vehicle to your rental fleet
          </p>
        </div>
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-pulse">
            <span className="block sm:inline">✅ Car added successfully!</span>
          </div>
        )}
      </div>

      {/* Recently Added Cars */}
      {recentlyAdded.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Recently Added Cars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {recentlyAdded.map((car) => (
              <div key={car.id} className="bg-white rounded p-2 text-xs">
                <div className="font-medium">{car.year} {car.make} {car.model}</div>
                <div className="text-gray-500">{car.licensePlate} • ${car.pricePerDay}/day</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Car Form */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <input
              type="text"
              name="make"
              value={carData.make}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.make ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., Toyota"
              required
            />
            {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <input
              type="text"
              name="model"
              value={carData.model}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.model ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., Camry"
              required
            />
            {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={carData.year}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.year ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., 2023"
              min="1990"
              max={new Date().getFullYear() + 1}
              required
            />
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="text"
              name="color"
              value={carData.color}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.color ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., White"
              required
            />
            {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={carData.licensePlate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.licensePlate ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., ABC-123"
              required
            />
            {errors.licensePlate && <p className="text-red-500 text-xs mt-1">{errors.licensePlate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day ($)</label>
            <input
              type="number"
              name="pricePerDay"
              value={carData.pricePerDay}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.pricePerDay ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., 50"
              min="0"
              step="0.01"
              required
            />
            {errors.pricePerDay && <p className="text-red-500 text-xs mt-1">{errors.pricePerDay}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={carData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="Mid-size">Mid-size</option>
              <option value="Full-size">Full-size</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={carData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
            <textarea
              name="description"
              value={carData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional details about the car..."
              rows="3"
            />
          </div>

          {/* Features */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableFeatures.map((feature) => (
                <label key={feature} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={carData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Car...
                </div>
              ) : (
                'Add Car to Fleet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCars;
