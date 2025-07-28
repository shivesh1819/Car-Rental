// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashBoardPage from "./pages/DashBoardPage"; // ✅ Import this
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvailableCar from "./pages/AvailableCar";
import CarDetails from "./components/CarDetails";
import CarPage from "./components/CarPage";
import MyBookings from "./components/MyBookings";
import SubscribeBox from "./components/SubscribeBox";
import FeedbackCard from "./components/FeedbackCard";
import CarPoster from "./components/CarPoster";
import CardCar from "./components/CardCar";
import BookingCard from "./components/BookingCard";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/availableCars" element={<AvailableCar/>} />
        <Route path="/dashboard" element={<DashBoardPage />} /> {/* ✅ Fixed */}
        <Route path="/book" element={<BookingCard />} />
        <Route path="/cars" element={<CardCar />} />
        <Route path="/poster" element={<CarPoster />} />
        <Route path="/feedback" element={<FeedbackCard />} />
        <Route path="/subscribe" element={<SubscribeBox />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/CarPage" element={<CarPage/>}/>
        <Route path="/CarDetails" element={<CarDetails/>}/>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;

