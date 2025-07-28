import React from 'react'
import carImg from "../assets/bmw-m2.png";

const CarPoster = () => {
    return (
        <>
        
            <div className="mx-auto my-12 max-w-7xl px-4 mt-32">
                
                <section
                    className=" rounded-3xl
            bg-gradient-to-r from-[#0060ff] via-[#2e8bff] to-[#a9d0ff]
            px-6 py-16
            sm:px-12 lg:px-20
            flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10"
                >
                    
                    <div className=" max-w-xl text-white ">
                        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                            Do You Own a Luxury&nbsp;Car?
                        </h2>

                        <p className="mt-6 text-lg leading-relaxed">
                            Monetize your vehicle effortlessly by listing it on&nbsp;
                            <span className="font-semibold">CarRental</span>. We take care of
                            insurance, driver verification and secure payments — so you can earn
                            passive income, stress‑free.
                        </p>

                        <button
                            onClick={() => console.log("CTA clicked")}
                            className="mt-10 inline-block rounded-lg bg-white px-10 py-3
                                        text-base font-medium text-blue-700
                                        shadow-md transition hover:shadow-lg
                                        focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                            List your car
                        </button>
                    </div>

                    <div className="mt-10 lg:mt-0">
                        <img
                        src={carImg}
                        alt="BMW M2"
                        className="
            w-full max-w-[350px] lg:max-w-[500px] object-contain"
                    />
                    </div>
                    
                </section>
            </div>
        </>
    )
}

export default CarPoster
