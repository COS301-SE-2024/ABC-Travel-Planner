import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import Image from 'next/image';

const Itinerary = () => {
  return (
    <div className="flex flex-col m-4 items-center">
      <div className="p-8 mt-4 w-full max-w-6xl rounded-lg overflow-hidden shadow-xl bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Itineraries</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaPlus className="mr-2" />
            Add Itinerary
          </button>
        </div>
        <div>
          {/* Itinerary Item */}
          <div className="flex flex-row items-center justify-between p-4 my-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-row items-center">
              <div className="relative w-28 h-28 mr-4">
                <Image
                  src="/images/paris.jpg"
                  alt="Paris"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">Trip to Paris</h2>
                <p className="text-sm text-gray-500">Paris, France</p>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <FaPen className="mr-1" />
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-800 flex items-center">
                <FaTrash className="mr-1" />
                Delete
              </button>
            </div>
          </div>
          {/* Itinerary Item */}
          <div className="flex flex-row items-center justify-between p-4 my-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-row items-center">
              <div className="relative w-28 h-28 mr-4">
                <Image
                  src="/images/japan.jpg"
                  alt="Tokyo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">Trip to Tokyo</h2>
                <p className="text-sm text-gray-500">Tokyo, Japan</p>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <FaPen className="mr-1" />
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-800 flex items-center">
                <FaTrash className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
