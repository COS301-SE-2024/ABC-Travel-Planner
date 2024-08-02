"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react';
import SearchModal from "./SearchModal"
import "./modal.css"
import Cookie from 'js-cookie'

interface ItemData {
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
    image_url: string;
  }

  //Making the component async ensures that it constantly refreshes the whole page on change/useEffect execution
  const DynamicDivs: React.FC<DynamicDivsProps> = ({ image_url }) => {
    const [divs, setDivs] = useState<DivItem[]>([]);
    const [fetchedData, setFetchedData] = useState<ItemData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    // const [initialLoad, setInitialLoad] = useState(true);
    const [fetchCount, setFetchCount] = useState(0);
    // const user_id = Cookie.get('user_id') 
    
    useEffect(() => {
        // console.log("Initial Load: " + initialLoad)
        // if (initialLoad) {
            // setInitialLoad(false)
        // } else {
            const id = JSON.parse(localStorage.getItem('id') as string).id
            console.log("ID IN DYNAMIC DIV: " + JSON.stringify(id))
    
            const fetchItems = async () => {
                try {
                    const user_id = 'User1'
                    const response = await fetch(`http://localhost:4000/itinerary-items/${id}/${user_id}`);
                    
                    const data: ItemData[] = await response.json();
                    console.log("Response from server: " + JSON.stringify(data))
                    
                    const initialDivs = data.map((dataItem, index) => ({
                        id: index,
                        data: dataItem,
                    }));
    
                    initialDivs.forEach((data, index) => {
                        switch (data.data.item_type) {
                            case "stays":
                                data.data.item_type = "A place to stay"
                                break;
                            case "attractions":
                                data.data.item_type = "Attraction"
                                break;
                            case "airportTaxis":
                                data.data.item_type = "Airport Taxi"
                                break;
                            case "carRental":
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
                    // setInitialLoad(true);
                } catch (error) {
                    console.error("Error fetching items:", error);
                }
            };

            console.log("Fetched Data: " + fetchedData)
            // console.log("Initial Load: " + initialLoad)
            
            //Fetches more than once to ensure data is loaded without overfetching
            if (fetchCount < 3 || !fetchedData || !divs) {
                console.log("FETCHING...")
                fetchItems();
                setFetchCount(fetchCount + 1);
            }
        // }
    }, [fetchedData])

    const handleAddDiv = () => {
      console.log("Current divs: " + JSON.stringify(divs))    
      const newId = divs.length;
      const newDiv = {
        id: newId,
        data: fetchedData[newId % fetchedData.length],
      };
      setDivs([...divs, newDiv]);
    };

    const handleRemoveDiv = async (id: number) => {
    console.log(`Removing DIV ${id} from: ${divs[id]?.data?.itinerary_id}`)
    const image_url = divs[id].data.image_url
    const itinerary_id = divs[id].data.itinerary_id
    const timestamp = divs[id].data.timestamp


    //Remember to get the user token and send it to backend...
      try {
        const user_name = 'User1';
        const response = await fetch('http://localhost:4000/itinerary-items/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            //   Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ user_name, image_url, itinerary_id, timestamp }),
          })
        
        console.log(response)
        //Div ids still need to be updated after deletion...
        setDivs(divs.filter(divItem => divItem.id !== id));
        
        //CODE TO CHANGE DIV's IDs... 
        for (let index = id+1; index < divs.length; index++) {
            divs[index].id--;
        }

      } catch (error) {
        console.error("Could not remove item: ", error)
      }
    };
  
    const handleModelClose = () => {
    //   console.log(JSON.stringify(divs))
      setIsOpen(false);
    };

    return (
        <>
        {divs.map((divItem) => (
            divItem.data && <div key={divItem.id} className="relative border-2 border-black-500 rounded-md item-div font-sans">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 linkClass">
                    <a href="#" className='text-center flex justify-center'>
                        <img className="w-full h-60 rounded-t-lg" src={divItem?.data?.image_url} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{divItem?.data?.item_name}</h2>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{divItem?.data?.item_type}</p>
                    </div>
                </div>

                <Button 
                    className="absolute top-2 right-2 text-gray-800 hover:text-gray-700 focus:outline-none closeButton" 
                    onClick={() => handleRemoveDiv(divItem.id)}
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
        ))}
            <SearchModal handleAddDiv={ handleModelClose }/>
        </>
    );
};

export default DynamicDivs;