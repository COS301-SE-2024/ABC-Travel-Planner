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

  return (
    <div className="relative w-2/3 mx-auto bg-white rounded-lg shadow-md p-4">
      <div className='absolute top-0 right-0 text-right'>
        <div className="mb-2">
          <p className="text-gray-600 inline-block pr-2">{`${place.totalReviews} reviews `}</p>
          <div className="rounded-full bg-green-500 text-white px-2 py-2 text-sm font-semibold inline-block mr-2 mt-2">
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
          <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
          <p className="text-gray-700 text-lg font-semibold">{`${place.city}, ${place.country}`}</p>
          <p className="text-gray-800 mt-4">{place.description}</p>

          <div className="mt-4">
            <div className="relative inline-block">
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold">
                Select Date:
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-40 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
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
                    {date}ZipLining destinations
                  </option>
                ))}
              </select>
              {selectedDate && (
                <p className="text-gray-600 mt-2">Selected Date: {selectedDate}</p>
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-right">
                <p className="text-3xl font-semibold">{place.price}</p>
                <p className="text-gray-600 text-sm">{place.priceDetails}</p>
                <p className="text-gray-600 text-sm">{place.disclaimer}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterCard;
