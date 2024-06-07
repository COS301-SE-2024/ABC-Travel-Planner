import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import Image from "next/image";

const Itinerary = () => {
  return (
    <div className="flex flex-col m-4 items-center">
      <div style={{backgroundColor: 'rgba(173, 216, 230,0.5)'}} className="p-8 mt-4 w-full  rounded-lg overflow-hidden shadow-xl ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Itineraries</h1>
          <button
            aria-label="Add Itinerary"
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" />
            Add Itinerary
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Itinerary Item */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="relative w-full h-40 pb-2/3">
              <Image
                src="/images/paris.jpg"
                alt="Paris"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Trip to Paris
              </h2>
              <p className="text-sm text-gray-500">Paris, France</p>
              <div className="flex justify-end mt-2 space-x-4">
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
          {/* Itinerary Item */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="relative w-full h-40 pb-2/3">
              <Image
                src="/images/japan.jpg"
                alt="Tokyo"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Trip to Tokyo
              </h2>
              <p className="text-sm text-gray-500">Tokyo, Japan</p>
              <div className="flex justify-end mt-2 space-x-4">
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
          {/* Repeat this structure for more itinerary items */}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
