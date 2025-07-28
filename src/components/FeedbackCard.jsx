import React from 'react'
import { FaStar } from "react-icons/fa";
import profileImg from "../assets/testimonial_image_1.png"; // Update with your actual image path
import profileImg1 from "../assets/testimonial_image_2.png"; // Update with your actual image path


const FeedbackCard = () => {
    return (
        <>
                <div className='grid grid-cols-1 text-center mt-32 mb-16'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-1'> What Our Customers Say</h1>
                <p className=' ms-5 me-5 text-center'>Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.</p>
            </div>
            <div className="grid ms-20 me-10 gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div className="max-w-sm p-6 bg-white rounded-xl shadow-md">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <img
                        src={profileImg}
                        alt="Emma Rodriguez"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">Emma Rodriguez</h3>
                        <p className="text-sm text-gray-500">Barcelona, Spain</p>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex items-center mt-4 text-blue-600">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5" />
                    ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                    "I've rented cars from various companies, but the experience with
                    CarRental was exceptional."
                </p>
            </div>
                <div className="max-w-sm p-6 bg-white rounded-xl shadow-md">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <img
                        src={profileImg1}
                        alt="Emma Rodriguez"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">John Smith</h3>
                        <p className="text-sm text-gray-500">New York, USA</p>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex items-center mt-4 text-blue-600">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5" />
                    ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                    "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"
                </p>
            </div>
                <div className="max-w-sm p-6 bg-white rounded-xl shadow-md">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <img
                        src={profileImg}
                        alt="Emma Rodriguez"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">Emma Rodriguez</h3>
                        <p className="text-sm text-gray-500">Barcelona, Spain</p>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex items-center mt-4 text-blue-600">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5" />
                    ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                    "I've rented cars from various companies, but the experience with
                    CarRental was exceptional."
                </p>
            </div>
            </div>
            

        </>
    )
}

export default FeedbackCard
