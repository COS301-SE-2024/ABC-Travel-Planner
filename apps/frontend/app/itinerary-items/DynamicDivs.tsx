"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react';
import SearchModal from "./SearchModal"
import "./modal.css"
import Cookie from 'js-cookie'
import PopupMessage from '../utils/PopupMessage';
import { truncateTitle } from '../utils/functions/TruncateTitle';
import { createNewDates } from '../utils/functions/convertDates';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

interface ItemData {
    destination: string;
    location: string;
    date: string[];
    item_name: string;
    item_type: string;
    image_url: string;
    itinerary_id: string;
    timestamp: {
        _seconds: string;
        _nanoseconds: string;
    }
  }
  
  interface DivItem {
    id: number;
    data: ItemData;
  }

  interface DynamicDivsProps {
    id?: string;
    location?: string;
    destination?: any;
  }



  function truncateInfo(dateString: string, len: number) : string {
    if (dateString.length > len) {
        return dateString.substring(0, len) + '...';
    }
    
    return dateString;
  }

  //Making the component async ensures that it constantly refreshes the whole page on change/useEffect execution
  const DynamicDivs: React.FC<DynamicDivsProps> = ({ id, location, destination }) => {
    const [uploaded, setUploaded] = useState(false);
    const [divs, setDivs] = useState<DivItem[]>([]);
    const [fetchedData, setFetchedData] = useState<ItemData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [fetchCount, setFetchCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [canRemove, setCanRemove] = useState(true);
    const [trigger, setTrigger] = useState(false);
    const [message, setMessage] = useState("");
    const { selectedTheme, themeStyles, setTheme } = useTheme();
    
    useEffect(() => {
        if (id) {
            if (localStorage.getItem(id) === null) {
                localStorage.setItem('id', JSON.stringify({
                    id: id, 
                    expiry: Date.now() + 60 * 60 * 1000
                }));
            }
        } else {
            throw new Error('ID for itinerary not included');
        }

        if (location) {
            if (localStorage.getItem(location) === null) {
                localStorage.setItem('location', JSON.stringify({
                    location: location,
                    expiry: Date.now() + 60 * 60 * 1000
                }));
            }

            const itinerary_location = location;
        } else {
            throw new Error('Location for itinerary not included');
        }

        const fetchItems = async () => {
            try {
                const user_id = Cookie.get('user_id') ?? 'User1'
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
                const response = await fetch(`${backendUrl}/itinerary-items/${id}/${user_id}`);
                const data: ItemData[] = await response.json();
                
                
                const initialDivs = data.map((dataItem, index) => ({
                    id: index,
                    data: dataItem,
                }));
                
                initialDivs.forEach(async (data, index) => {    
                    data.data.date = [createNewDates(data.data.date)]

                    switch (data.data.item_type) {
                        case "stays":
                            data.data.item_type = "A Place to Stay"
                            break;
                        case "attractions":
                            data.data.item_type = "Attraction"
                            break;
                        case "airportTaxis":
                            data.data.item_type = "Airport Taxi"
                            break;
                        case "carRentals":
                            data.data.item_type = "Car Rental"
                            break;
                        case "flight": 
                            data.data.item_type = "Flight"
                            break;
                        default:
                            break;
                    }
                    
                });
                
                setDivs(initialDivs);
                setFetchedData(data);
                
                // divs.map(async (divItem) => {
                //     console.log(divItem?.data?.date);
                // })
                
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        //Fetches more than once to ensure data is loaded without overfetching
        if (fetchCount < 3 || !fetchedData || !divs) {
            fetchItems();
            setFetchCount(fetchCount + 1);
        }

    }, [uploaded])

    const handleRemoveDiv = async (id: number) => {
        if (canRemove) {
            setCanRemove(false);
            const image_url = divs[id].data.image_url
            const itinerary_id = divs[id].data.itinerary_id
            const timestamp = divs[id].data.timestamp

            //Remember to get the user token and send it to backend...
            try {
                const user_name = Cookie.get('user_id') ?? 'User1';
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
                const response = await fetch(`${backendUrl}/itinerary-items/delete`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_name, image_url, itinerary_id, timestamp }),
                })
                
                setDivs(divs.filter(divItem => divItem.id !== id));
                
                for (let index = id+1; index < divs.length; index++) {
                    divs[index].id--;
                    if (divs[index].id < 0) {
                        divs[index].id = 0;
                    }
                }

                //Popup Messages to inform user of deletion
                setMessage(`Item removed!`);
                setTrigger(true);
                setTimeout(() => {
                    setCanRemove(true);
                    setTrigger(false);
                }, 1500);

            } catch (error) {
                console.error("Could not remove item: ", error)
            }
      } else {
        console.error("Cannot remove item -- waiting for delay to reset");
      }
    };
  
    const handleModelClose = () => {
      setIsOpen(false);
    };

    return (
        <>
        {divs.map((divItem) => (
            divItem.data && <div key={divItem.id} className="relative border border-black-500 rounded-md item-div font-sans backdrop-filter backdrop-blur-[4px] max-w-[520] w-full mx-auto">
                {/* <div className="max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 linkClass"> */}
                    <a href="#" className='text-center flex justify-center ml-12 mr-12'>
                        <img className="w-full h-60 mt-10 mb-2 border-[1px] border-white border-solid rounded-md" src={divItem?.data?.image_url} alt="" />
                    </a>

                    <div className="p-5">
                        <a href="#">
                            <h2 className="mb-2 text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-black dark:text-black text-center" style={{ color: themeStyles.textColor }}>{truncateTitle(divItem?.data?.item_name, 30)}</h2>
                        </a>

                    <hr></hr>

                <div className="moreInfo">
                    <div className="flex justify-between mb-1">
                        <div className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3 font-semibold text-black text-left" style={{ color: themeStyles.textColor }}>Type:</div>
                        <div className="text-base sm:text-xs md:text-sm lg:text-md xl:text-lg text-right font-normal break-words text-black">{divItem?.data?.item_type}</div>
                    </div>

                    <div className="flex justify-between mb-1">
                        <div className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3 font-semibold text-black text-left" style={{ color: themeStyles.textColor }}>Date:</div>
                        <div className="text-base sm:text-xs md:text-sm lg:text-md xl:text-lg text-right font-normal break-words overflow-hidden text-wrap whitespace-pre-wrap text-black">{(divItem?.data?.date.length == 0 || divItem?.data?.date[0].length == 0) ? 'No date selected' : truncateInfo(divItem?.data?.date[0], 42)}</div>
                    </div>

                    <div className="flex justify-between mb-1">
                        <div className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3 font-semibold text-black text-left" style={{ color: themeStyles.textColor }}>Address:</div>
                        <div className="text-base sm:text-xs md:text-sm lg:text-md xl:text-lg text-right font-normal break-words overflow-hidden text-wrap whitespace-pre-wrap text-black">{truncateInfo(divItem?.data?.destination, 40)}</div>
                    </div>
                    </div>
                </div>

                <Button 
                    className="absolute top-2 right-2 text-gray-800 hover:text-gray-700 focus:outline-none closeButton" 
                    onClick={() => handleRemoveDiv(divItem.id)} disabled={isClicked}
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
        ))}
            <PopupMessage msg={message} trigger={trigger} />
            <SearchModal handleAddDiv={ handleModelClose }/>
        </>
    );
};

export default DynamicDivs;