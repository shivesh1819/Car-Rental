import React from "react";

const SubscribeBox = () => {
    return (

        <>
            <div className='grid grid-cols-1 text-center mt-32 mb-10'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-1'> Never Miss a Deal!</h1>
                <p className=' ms-5 me-5 text-center'>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
            </div>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // handle submit logic here
                console.log("Subscribed!");
            }}
            className="max-w-xl w-full mx-auto mt-10 mb-32"
        >
            <div className="flex rounded-md overflow-hidden border border-gray-300">
                <input
                    type="email"
                    required
                    placeholder="Enter your email id"
                    className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Subscribe
                </button>
            </div>
        </form>
        </>
    );
};

export default SubscribeBox;
