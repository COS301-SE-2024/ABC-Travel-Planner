"use client";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { deleteItinerary,updateItinerary , getItineraryImage} from ".";
import axios from "axios";

interface ItineraryComponentProps {
  name: string;
  location: string;
  image: string;
  shared: boolean;
  id: any,
  fetchItineraries: () => void;
}

const ItineraryComponent: React.FC<ItineraryComponentProps> = ({
  name,
  location,
  image,
  id,
  shared,
  fetchItineraries
}) => {
  const [newName, setNewName] = useState(name);
  const [newLocation, setNewLocation] = useState(location);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleNameChange = (e: any) => setNewName(e.target.value);
  const handleLocationChange = (e: any) => setNewLocation(e.target.value);

  const openEditModal = (e:any) => {
    e.preventDefault();
    setShowEditModal(true);

  }
  const closeEditModal = () => {
    // setNewName(name);
    // setNewLocation(location);
    setShowEditModal(false);


  };

  const openDeleteModal = (e:any) => {
    e.preventDefault();
    setShowDeleteModal(true);
  }
  const closeDeleteModal = () => {
    setShowDeleteModal(false);

  }

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const imageUrl = await getItineraryImage(newLocation);
    await axios.post("http://localhost:4000/itinerary/update",{itineraryId:id,name:newName,location:newLocation,imageUrl});
    closeEditModal();
    fetchItineraries();
  };

  const handleDelete = async () => {
     await axios.post("http://localhost:4000/itinerary/delete",{itineraryId:id});
     fetchItineraries();
    closeDeleteModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <Link href={`/itinerary-items?location=${location}&id=${id}`} passHref>
        <div className="relative w-full h-40 pb-2/3">
          <Image
            src={image}
            alt={location}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="ml-1 text-sm text-gray-500">{location}</p>
          <div className="flex justify-end mt-2 space-x-4">
            <button
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              onClick={openEditModal}
            >
              <FaPen className="mr-1" />
              Edit
            </button>
            <button
              className="text-sm text-red-600 hover:text-red-800 flex items-center"
              onClick={openDeleteModal}
            >
              <FaTrash className="mr-1" />
              Delete
            </button>
          </div>
        </div>
      </Link>

      
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              
              <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
                <h3 className="text-xl font-semibold">Edit Itinerary</h3>
                <button
                  className="text-gray-200 hover:text-gray-300 focus:outline-none"
                  onClick={closeEditModal}
                >
                  &#215;
                </button>
              </div>
              {/* <div className="relative w-100 h-40">
          <Image
            src={image}
            alt={location}
            layout="fill"
            objectFit="cover"
            
          />
        </div> */}
              
              <form onSubmit={handleEdit} className="p-6">
                <div className="mb-4">
                  <label
                    htmlFor="editName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="editName"
                    defaultValue={name}
                    onChange={handleNameChange}
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="editLocation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    id="editLocation"
                    defaultValue={location}
                    onChange={handleLocationChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-sm mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
             
              <div className="flex justify-between items-center px-6 py-4 bg-red-600 text-white">
                <h3 className="text-xl font-semibold">Delete Itinerary</h3>
                <button
                  className="text-gray-200 hover:text-gray-300 focus:outline-none"
                  onClick={closeDeleteModal}
                >
                  &#215;
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete this itinerary?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryComponent;
