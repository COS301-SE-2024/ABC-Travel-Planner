"use client";
import React, { useState } from 'react';

interface SearchCardProps {
    place: any;
}

export const getRatingColor = (rating: number) => {
    if (rating >= 4) {
        return 'bg-green-500';
    } else if (rating >= 3) {
        return 'bg-yellow-500';
    } else {
        return 'bg-red-500';
    }
};

export const getPricePlaceholder = (type: string) => {
    switch (type) {
        case 'stays':
            return 'per night';
        case 'attractions':
            return 'per ticket';
        case 'carRental':
            return 'per day';
        case 'airportTaxis':
            return 'per ride';
        default:
            return 'Price not available';
    }
};

export const generatePrice = (id: string, type: string, country: string) => {
    let basePrice;
    switch (type) {
        case 'stays':
            basePrice = 100;
            break;
        case 'attractions':
            basePrice = 50;
            break;
        case 'carRental':
            basePrice = 70;
            break;
        case 'airportTaxis':
            basePrice = 40;
            break;
        default:
            basePrice = 100;
    }

    let countryMultiplier;
    switch (country) {
        case 'Africa':
            countryMultiplier = 1;
            break;
        case 'USA':
            countryMultiplier = 1.2;
            break;
        case 'UK':
            countryMultiplier = 1.3;
            break;
        default:
            countryMultiplier = 1.1;
    }

    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomMultiplier = 1 + (seed % 100) / 1000;

    return Math.round(basePrice * countryMultiplier * randomMultiplier * 18); // Assuming 1 USD = 18 ZAR
};

const SearchCard: React.FC<SearchCardProps> = ({ place }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const handleSelectDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    function extractLocation(fullString: string) {
        // Split the string by spaces and commas
        const parts = fullString.split(/,|\s+/);

        // Remove the code part and join the remaining parts for city and country
        const city = parts.slice(1, -1).join(' ');
        const country = parts[parts.length - 1];

        return { city, country };
    }
    let availableDates = ['2024-06-01', '2024-06-02', '2024-06-03'];
    const numRooms = null;
    let address = place.plusCode.compoundCode;
    const location = extractLocation(address);
    const addressParts = address.split(',');

    const cityCountry = addressParts.slice(-2).map((part: string) => part.trim()).join(', ');
    const price = generatePrice(place.id, place.type, location.country);

    return (
        <div className="relative w-[70%] mx-auto bg-white rounded-lg shadow-md p-4 h-70">
            <div className='absolute top-0 right-0 text-right'>
                <div className="mb-1">
                    {/* <p className="text-gray-600 inline-block pr-2">{`${place.Fg.userRatingCount} reviews `}</p> */}
                    <div className={`rounded-full ${getRatingColor(place.rating)} text-white px-2 py-2 text-sm font-semibold inline-block mr-2 mt-2 mb-2`}>
                        {place.rating}
                    </div>
                </div>
                <p className="text-gray-600 inline-block pr-2">{`${place.userRatingCount} reviews `}</p>
            </div>
            

            <div className='flex flex-row justify-start items-start'>
                <div className="w-1/3">
                    <img
                        src={`${place.firstPhotoUrl}`}
                        alt={place.displayName.text}
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="w-2/3 pl-4 overflow-hidden">
                    <h1 className="text-4xl font-bold mb-2 text-blue-500">{place.displayName.text}</h1>
                    <p className="text-gray-700 text-lg font-semibold">{`${location.city} ${location.country}`}</p>

                    {place.isGoodForChildren && (
                        <div className="mt-2">
                            <div className="inline-block bg-green-500 text-white text-sm font-bold rounded-full px-3 py-1">
                                Good for families with children
                            </div>
                        </div>
                    )}

                    <p className="text-gray-800 mt-4">{place.editorialSummary && place.editorialSummary.text}</p>

                    {place.paymentOptions?.acceptsCreditCards && (
                        <div className="mt-2 flex items-center text-green-600 text-sm">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm5 7.5l-6 6-3-3 1.414-1.414L9 10.672l4.586-4.586L15 7.5z" />
                            </svg>
                            Accepts Credit Cards
                        </div>
                    )}

                    {numRooms && (
                        <div className="mt-2 flex items-center text-red-500 text-sm">
                            {`Only ${numRooms} rooms available at this price`}
                        </div>
                    )}

                    <div className="mt-4 flex justify-between items-end">
                        <div className="flex items-center space-x-4">
                            <div className="relative inline-block">
                                <select
                                    className="block appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-3 px-20 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                                    value={selectedDate}
                                    onChange={handleSelectDate}
                                >
                                    <option value="">Select a date</option>
                                    {availableDates.map((date: any) => (
                                        <option
                                            key={date}
                                            value={date}
                                            className="text-lg hover:bg-gray-100"
                                        >
                                            {date}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="w-4 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {selectedDate && (
                                <div className="block appearance-none bg-white rounded-md py-3 px-6 mt-1">
                                    <p className="text-gray-400 text-xl font-semibold">
                                        Selected Date: {selectedDate}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-3xl text-blue-500 font-semibold">ZAR {price}</p>
                            <p className="text-blue-500 text-sm">{getPricePlaceholder(place.type)}</p>
                            <p className="text-blue-500 text-sm">Tax and rates included</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchCard;