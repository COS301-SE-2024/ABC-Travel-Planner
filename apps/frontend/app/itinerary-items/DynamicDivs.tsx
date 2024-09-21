"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react';
import SearchModal from "./SearchModal"
import "./modal.css"
import Cookie from 'js-cookie'
import PopupMessage from '../utils/PopupMessage';
import { truncateTitle } from '../utils/functions/TruncateTitle';
import { format, parseISO } from 'date-fns';

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

function getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
}

function formatDateGroup(dates: string[]): string {
    if (dates.length === 0) return '';
    let months: string[] = [];
    let monthsIndexes: number[] = [];
    let output:string = "";

    dates.map((item, index) => {
        console.log(item)
        let month = item.substring(5,7);
        if (!months.includes(month)) {
            months.push(month);
            monthsIndexes.push(index);
        }
    })
    console.log(months);
    
    let startIndex = 0;
    months.forEach((item, index) => {
        let endIndex = monthsIndexes[index];
        let daysArr: number[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            daysArr.push(Number(dates[i].substring(9,11)));
        }
        daysArr.sort();

        if (daysArr.length < 3) {
            daysArr.forEach((day, index) => {
                if (index < daysArr.length) {
                    output += day + ", "
                } else {
                    output += day
                }
            })
            output += getMonthName(Number(item)) + '; '
        }
        else {
            let counter: number = 0;
            let endIndex: number = 0;
            let recurring: boolean = true;
            for (let i = 0; i < daysArr.length; i++) {
                if (i+1 < daysArr.length) {
                    if (daysArr[i + 1] - daysArr[i] == 1) {
                        counter++;
                    }

                }
    
                if (counter >= 2) {
                    recurring = true;
                }
            }
        }

        startIndex = endIndex;
    })
    // Then I want to check each day... 
    // if there are more than 3 following days (3,4,5) then start a counter
    // if the next number's difference is > 1 then stop counter...
    // Then take current index and subtract counter from it... 
    // Start there and push the following string:
    // date[index-counter] + "-" + date[index]
  
    const parsedDates = dates.map(d => parseISO(d));
    parsedDates.sort((a, b) => a.getTime() - b.getTime());
  
    const groups: { [key: string]: number[] } = {};
  
    parsedDates.forEach(date => {
      const key = format(date, 'MMMM yyyy');
      if (!groups[key]) groups[key] = [];
      groups[key].push(date.getDate());
    });
  
    let outStr = Object.entries(groups)
      .map(([monthYear, days]) => {
        const uniqueDays = [...new Set(days)].sort((a, b) => a - b);
        return `${uniqueDays.join(', ')} ${monthYear}`;
      })
      .join('; ');

      return outStr
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
            console.log(itinerary_location)
        } else {
            throw new Error('Location for itinerary not included');
        }

        const fetchItems = async () => {
            try {
                const user_id = Cookie.get('user_id') ?? 'User1'
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
                const response = await fetch(`${backendUrl}/itinerary-items/${id}/${user_id}`);
                const data: ItemData[] = await response.json();
                console.log("Response from server: " + JSON.stringify(data))
                
                const initialDivs = data.map((dataItem, index) => ({
                    id: index,
                    data: dataItem,
                }));

                initialDivs.forEach((data, index) => {
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
                divs.map((divItem) => {
                    console.log(divItem?.data?.date);
                })


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
        if (canRemove) {
            setCanRemove(false);
            console.log(`Removing DIV ${id} from: ${divs[id]?.data?.itinerary_id}`)
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
                    //   Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({ user_name, image_url, itinerary_id, timestamp }),
                })
                
                //Div ids still need to be updated after deletion...
                setDivs(divs.filter(divItem => divItem.id !== id));
                
                //CODE TO CHANGE DIV's IDs... 
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
            divItem.data && <div key={divItem.id} className="relative border border-black-500 rounded-md item-div font-sans backdrop-filter backdrop-blur-[4px] max-w-lg mx-auto">
                {/* <div className="max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 linkClass"> */}
                    <a href="#" className='text-center flex justify-center ml-12 mr-12'>
                        <img className="w-full h-60 mt-10 mb-2 border-[1px] border-white border-solid rounded-md" src={divItem?.data?.image_url} alt="" />
                    </a>

                    <div className="p-5">
                        <a href="#">
                            <h2 className="mb-2 text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-black dark:text-white text-center">{truncateTitle(divItem?.data?.item_name, 55)}</h2>
                        </a>

                    <hr></hr>

                <div className="moreInfo">
                    <div className="flex justify-between mb-1">
                        <div className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3 font-semibold text-black text-left">Type:</div>
                        <div className="text-base sm:text-xs md:text-sm lg:text-md xl:text-lg text-right font-normal break-words">{divItem?.data?.item_type}</div>
                    </div>

                    <div className="flex justify-between mb-1">
                        <div className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3 font-semibold text-black text-left">Date:</div>
                        <div className="text-base sm:text-xs md:text-sm lg:text-md xl:text-lg text-right font-normal break-words overflow-hidden text-wrap whitespace-pre-wrap">{divItem?.data?.date.length == 0 ? 'No date selected' : truncateInfo(formatDateGroup(divItem?.data?.date), 60)}</div>
                    </div>

                    <div className="flex justify-between mb-1">
                        <div className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3 font-semibold text-black text-left">Address:</div>
                        <div className="text-base sm:text-xs md:text-sm lg:text-md xl:text-lg text-right font-normal break-words overflow-hidden text-wrap whitespace-pre-wrap">{truncateInfo(divItem?.data?.destination, 40)}</div>
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