 import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import AddCars from "../components/AddCars";
import ManageCars from "../components/ManageCars";
import ManageBookings from "../components/ManageBookings";

const DashBoardPage = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    monthlyRevenue: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock API function to simulate fetching dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data with some randomization to show dynamic behavior
    const mockData = {
      totalCars: Math.floor(Math.random() * 50) + 20,
      totalBookings: Math.floor(Math.random() * 200) + 100,
      pendingBookings: Math.floor(Math.random() * 15) + 5,
      confirmedBookings: Math.floor(Math.random() * 180) + 80,
      monthlyRevenue: Math.floor(Math.random() * 50000) + 25000,
      recentBookings: [
        { id: 1, customer: "John Doe", car: "Toyota Camry", date: "2024-01-25", status: "confirmed" },
        { id: 2, customer: "Jane Smith", car: "Honda Civic", date: "2024-01-24", status: "pending" },
        { id: 3, customer: "Mike Johnson", car: "BMW X5", date: "2024-01-23", status: "confirmed" },
        { id: 4, customer: "Sarah Wilson", car: "Mercedes C-Class", date: "2024-01-22", status: "confirmed" },
        { id: 5, customer: "David Brown", car: "Audi A4", date: "2024-01-21", status: "pending" }
      ]
    };
    
    setDashboardData(mockData);
    setLastUpdated(new Date());
    setLoading(false);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderDashboardContent = () => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'confirmed': return 'text-green-600';
        case 'pending': return 'text-yellow-600';
        case 'cancelled': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    return (
      <div className="p-4 sm:p-6 overflow-y-auto">
        <div className="mb-4 sm:mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Monitor overall platform performance including total cars, bookings,
              revenue, and recent activities
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
          >
            {loading ? '🔄' : '↻'} Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {[
            { 
              label: "Total Cars", 
              value: loading ? '...' : dashboardData.totalCars, 
              icon: "🚘",
              trend: loading ? null : (dashboardData.totalCars > 30 ? '+5%' : '+2%'),
              trendColor: 'text-green-500'
            },
            { 
              label: "Total Bookings", 
              value: loading ? '...' : dashboardData.totalBookings, 
              icon: "📦",
              trend: loading ? null : '+12%',
              trendColor: 'text-green-500'
            },
            { 
              label: "Pending", 
              value: loading ? '...' : dashboardData.pendingBookings, 
              icon: "⏳",
              trend: loading ? null : (dashboardData.pendingBookings > 10 ? '+3' : '-1'),
              trendColor: dashboardData.pendingBookings > 10 ? 'text-yellow-500' : 'text-green-500'
            },
            { 
              label: "Confirmed", 
              value: loading ? '...' : dashboardData.confirmedBookings, 
              icon: "✅",
              trend: loading ? null : '+8%',
              trendColor: 'text-green-500'
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded shadow-sm p-2 sm:p-3 text-center h-24 sm:h-28 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-md ${
                loading ? 'animate-pulse' : 'hover:scale-105'
              }`}
            >
              <div className="text-lg sm:text-xl mb-1">{stat.icon}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-sm sm:text-base font-semibold">
                {stat.value}
              </div>
              {stat.trend && (
                <div className={`text-xs ${stat.trendColor} font-medium`}>
                  {stat.trend}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Recent Bookings */}
          <div className="bg-white border p-3 sm:p-4 rounded shadow-sm">
            <h3 className="text-sm sm:text-base font-semibold mb-3">
              Recent Bookings
            </h3>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {dashboardData.recentBookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-100 last:border-b-0">
                    <div>
                      <div className="font-medium">{booking.customer}</div>
                      <div className="text-gray-500">{booking.car}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500">{booking.date}</div>
                      <div className={`font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white border p-3 sm:p-4 rounded shadow-sm">
            <h3 className="text-sm sm:text-base font-semibold mb-2">
              Monthly Revenue
            </h3>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ) : (
              <>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                  {formatCurrency(dashboardData.monthlyRevenue)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  Revenue for current month
                </p>
                <div className="flex items-center text-xs">
                  <span className="text-green-500 font-medium">↗ +15.3%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{width: '78%'}}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboardContent();
      case "addCars":
        return <AddCars onNavigate={setCurrentPage} />;
      case "manageCars":
        return <ManageCars onNavigate={setCurrentPage} />;
      case "manageBookings":
        return <ManageBookings onNavigate={setCurrentPage} />;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
      {renderPageContent()}
    </Layout>
  );
};

export default DashBoardPage;
