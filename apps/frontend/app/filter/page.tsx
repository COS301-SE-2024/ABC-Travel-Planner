import React from 'react';
import FilterCard from './filterCard';

const destinations = [
  {
    name: 'Destination 1',
    city: 'City 1',
    country: 'Country 1',
    rating: 4.5,
    totalReviews: 90,
    price: 'ZAR100',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Description of Destination 1',
    image: '/Images/BrazilBeach.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    deal: 'Family Deal',
    cancellationFee: true,
    numAdults: 2,
    roomsLeft: 5
  },
  {
    name: 'Destination 2',
    city: 'City 2',
    country: 'Country 2',
    rating: 1.2,
    totalReviews: 7234,
    price: 'ZAR120',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Description of Destination 2',
    image: '/Images/colombia.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    cancellationFee: true,
    numAdults: 2,
    roomsLeft: 50
  },
  {
    name: 'Luxury Villa by the Beach',
    city: 'Miami',
    country: 'USA',
    rating: 4.8,
    totalReviews: 3234,
    price: 'ZAR500',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Stunning beachfront villa with private pool and panoramic ocean views.',
    image: '/Images/miami.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    deal: 'Getaway Deal',
    cancellationFee: true,
    numAdults: 2,
    roomsLeft: 15
  },
  {
    name: 'Cozy Cottage in the Countryside',
    city: 'Cotswolds',
    country: 'UK',
    rating: 4.6,
    totalReviews: 134,
    price: 'ZAR150',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Charming cottage nestled in the picturesque Cotswolds countryside.',
    image: '/Images/dubai.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    deal: 'Limited-time Deal',
    cancellationFee: true,
    numAdults: 2,
    roomsLeft: 4
  },
  {
    name: 'City View Apartment',
    city: 'New York City',
    country: 'USA',
    rating: 3.4,
    totalReviews: 68,
    price: 'ZAR200',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Modern apartment with stunning views of the Manhattan skyline.',
    image: '/Images/Forest.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    cancellationFee: true,
    numAdults: 2,
    roomsLeft: 7
  },
  {
    name: 'Mountain Retreat',
    city: 'Aspen',
    country: 'USA',
    rating: 4.7,
    totalReviews: 3483,
    price: 'ZAR300',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Luxurious cabin nestled in the Rocky Mountains, perfect for skiing and hiking.',
    image: '/Images/japan.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    deal: 'Winter Deal',
    cancellationFee: false,
    numAdults: 1,
    roomsLeft: 2
  },
  {
    name: 'Historic Castle Stay',
    city: 'Edinburgh',
    country: 'UK',
    rating: 3.9,
    totalReviews: 1234,
    price: 'ZAR400',
    priceDetails: 'per night',
    disclaimer: 'Tax and rates included',
    description: 'Experience royal luxury with a stay in this beautifully restored castle.',
    image: '/Images/Paris.jpg',
    availableDates: ['2024-06-01', '2024-06-02', '2024-06-03'],
    cancellationFee: true,
    numAdults: 2,
    roomsLeft: 30
  }
];

const Filter = async () => {

  return (
    <div className="flex flex-col gap-4">
      <h1>ZipLining destinations</h1>
      {destinations.map((destination, index) => (
        <FilterCard key={index} place={destination} />
      ))}
    </div>
  );
};

export default Filter;