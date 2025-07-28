import React from 'react';
import { LuUsers } from "react-icons/lu";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { LiaCarSideSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import defaultCars from './carData'; // move your hardcoded carData to a separate file

const CardCar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

const storedCars = JSON.parse(localStorage.getItem("cars"));
const carData = storedCars || defaultCars;


    const handleCardClick = (car) => {
        if (user) {
            localStorage.setItem("selectedCar", JSON.stringify(car));
            navigate("/CarDetails");
        } else {
            toast.error("Login to book Car");
            navigate("/login");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ms-6 mt-32">
            {carData.map((car, index) => (
                <div
                    key={index}
                    onClick={() => handleCardClick(car)}
                    className='mt-32 ms-6 h-[58vh] w-[vw] rounded-2xl shadow-lg cursor-pointer '
                >
                    <div
                        className='border rounded-t-2xl rounded-bottom-0 h-[33vh] bg-cover'
                        style={{ backgroundImage: `url(${car.image})` }}
                    >
                        <div className='h-[10vh] pt-4 ps-3'>
                            <span className='border ps-2 pe-2 pb-1 rounded-3xl bg-blue-600 text-white'>
                                <small>Available Now</small>
                            </span>
                        </div>
                        <div className='mt-12 me-3'>
                            <span className='text-white bg-black p-2 rounded-lg float-end'>
                                ₹ {car.price}/ <span className='text-gray-400'>day</span>
                            </span>
                        </div>
                    </div>

                    <div>
                        <h1 className='ps-2'>{car.name}</h1>
                        <div className='ps-2'>
                            {car.type} <span className='font-extrabold'>&middot;</span> {car.year}
                        </div>
                    </div>

                    <div className='grid grid-cols-2 ps-2 mt-3 gap-1'>
                        <div className='flex'>
                            <span className='flex text-gray-400'>
                                <LuUsers className='mt-1 me-1 text-black' /> 4 Seats
                            </span>
                        </div>
                        <div>
                            <span className='flex text-gray-400 ms-1'>
                                <BsFuelPumpDiesel className='mt-1 me-1 text-black' /> {car.fuel}
                            </span>
                        </div>
                        <div className='flex'>
                            <span className='flex text-gray-400'>
                                <LiaCarSideSolid className='mt-1 me-1 text-black' /> {car.transmission}
                            </span>
                        </div>
                        <div>
                            <span className='flex text-gray-400 ms-1'>
                                <CiLocationOn className='mt-1 me-1 text-black' /> {car.location}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardCar;
