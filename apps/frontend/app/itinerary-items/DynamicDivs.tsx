"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react';
import SearchModal from "./SearchModal"
import "./modal.css"

interface ItemData {
    Item_Name: string;
    Item_Type: string;
    image_link: string;
  }
  
  interface DivItem {
    id: number;
    data: ItemData;
  }
  
  interface DynamicDivsProps {
    passedDivs: DivItem[];
    handleRemoveDiv: (id: number) => void;
  }
  
  const DynamicDivs: React.FC<DynamicDivsProps> = ({ passedDivs, handleRemoveDiv: removeDiv }) => {
    const [divs, setDivs] = useState<DivItem[]>([]);
    const [fetchedData, setFetchedData] = useState<ItemData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('id') as string).id
        console.log("ID IN DYNAMIC DIV: " + JSON.stringify(id))

        const fetchItems = async () => {
            try {
            const response = await fetch(`/api/DatabaseFetch?id=${id}`);
            const data: ItemData[] = await response.json();
            const initialDivs = data.map((dataItem, index) => ({
                id: index,
                data: dataItem,
            }));

            initialDivs.forEach((data, index) => {
                switch (data.data.Item_Type) {
                    case "stays":
                        data.data.Item_Type = "A place to stay"
                        break;
                    case "attractions":
                        data.data.Item_Type = "Attraction"
                        break;
                    case "airportTaxis":
                        data.data.Item_Type = "Airport Taxi"
                        break;
                    case "carRental":
                        data.data.Item_Type = "Car Rental"
                        break;
                    case "flight": 
                        data.data.Item_Type = "Flight"
                        break;

                    default:
                        break;
                }
            });
            setDivs(initialDivs);
            setFetchedData(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
  
      fetchItems();
    }, []);
  
    // const handleAddDiv = (searched: boolean) => {
    //   const newId = divs.length;
    //   const newDiv = {
    //     id: newId,
    //     data: fetchedData[newId % fetchedData.length],
    //   };

    //   setDivs([...divs, newDiv]);
    // };
  
    // const handleRemoveDiv = (id: number) => {
    //   setDivs(divs.filter(divItem => divItem.id !== id));
    // };
  
    // const handleModelClose = () => {
    //   setIsOpen(false);
    //   handleAddDiv;
    // };

    return (
        <>
        {divs.map((divItem) => (
            <div key={divItem.id} className="relative border-2 border-black-500 rounded-md item-div font-sans">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 linkClass">

                    <a href="#" className='text-center flex justify-center mt-1'>
                        <img className="w-92 h-40 rounded-t-lg" src={divItem?.data?.image_link} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{divItem?.data?.Item_Name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{divItem?.data?.Item_Type}</p>
                    </div>
                </div>

                <Button 
                    className="absolute top-2 right-2 text-gray-800 hover:text-gray-700 focus:outline-none closeButton" 
                    onClick={() => removeDiv(divItem.id)}
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
        ))}
        </>
    );
};

export default DynamicDivs;