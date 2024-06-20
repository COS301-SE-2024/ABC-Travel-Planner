"use client";
import React, { useState } from 'react';

interface FilterCardProps {
  place: any;
}

const FilterCard: React.FC<FilterCardProps> = ({ place }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const handleSelectDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) {
      return 'bg-green-500';
    } else if (rating >= 3) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  const numRooms = place.roomsLeft < 10 ? place.roomsLeft : null;

  return (
    <div className="relative w-5/6 mx-auto bg-white rounded-lg shadow-md p-4">
      <div className='absolute top-0 right-0 text-right'>
        <div className="mb-2">
          <p className="text-gray-600 inline-block pr-2">{`${place.totalReviews} reviews `}</p>
          <div className={`rounded-full ${getRatingColor(place.rating)} text-white px-2 py-2 text-sm font-semibold inline-block mr-2 mt-2`}>
            {place.rating}
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-start items-start'>
        <div className="w-1/3">
          <img
            src={place.image}
            alt={place.name}
            className="rounded-lg h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 pl-4">
          <h1 className="text-4xl font-bold mb-2 text-blue-500">{place.name}</h1>
          <p className="text-gray-700 text-lg font-semibold">{`${place.city}, ${place.country}`}</p>

          {place.deal && (
            <div className="mt-2">
              <div className="inline-block bg-green-500 text-white text-sm font-bold rounded-full px-3 py-1">
                {place.deal}
              </div>
            </div>
          )}

          <p className="text-gray-800 mt-4">{place.description}</p>

          {place.cancellationFee && (
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <svg className="w-5 h-5 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm5 7.5l-6 6-3-3 1.414-1.414L9 10.672l4.586-4.586L15 7.5z" />
              </svg>
              Free cancellation
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
                  {place.availableDates.map((date: any) => (
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
              <p className="text-3xl text-blue-500 font-semibold">{place.price}</p>
              <p className="text-blue-500 text-sm">{place.priceDetails}</p>
              <p className="text-blue-500 text-sm">{place.disclaimer}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterCard;
