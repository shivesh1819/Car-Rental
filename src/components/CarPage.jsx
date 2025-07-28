import React from 'react';
import CarDetails from './CarDetails';

const dummyCar = {
    title: 'BMW X5',
    type: 'SUV',
    year: 2006,
    pricePerDay: 300,
    imageUrl: './assets/BMWX5.png',
    tags: ['4 Seats', 'Hybrid', 'Semi-Automatic'],
    location: 'New York',
    description:
        'The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.',
    features: ['360 Camera', 'Bluetooth', 'GPS', 'Heated Seats', 'Rear View Mirror'],
};

const CarPage = () => {
    return <CarDetails car={dummyCar} />;
};

export default CarPage;
