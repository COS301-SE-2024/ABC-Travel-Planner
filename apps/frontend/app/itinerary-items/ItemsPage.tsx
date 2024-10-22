"use client"
import DynamicDivs from "./DynamicDivs";
import BackButton from "../../public/back.svg";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@nextui-org/react";
import Link from 'next/link';
import React from "react";
import BookMarkComponent from "./BookMarkComponent";
import "./modal.css";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface ItemsPageProps {
  id: any,
  location?: string,
  destination: any
}

const ItemsPage:React.FC<ItemsPageProps> = ({id, location, destination}) => {
    const { selectedTheme, setTheme, themeStyles } = useTheme();
    const router = useRouter();
    const handleBack = () => {
      router.push('/itinerary');
    };

    return (
        <>
    <div className="relative flex flex-col space-x-1 justify-center items-center text-center bg-neutral-300" style={{ background: themeStyles.background, minHeight: '100vh'}}>
      <div className="flex flex-col border border-gray-300 rounded-lg bg-white shadow-md w-[96vw] h-auto iteneraryInfo itineraryItemsBackground" style={{ background: themeStyles.primaryColor}}>
      <div className="h-full w-full"> 
      <div className="flex items-center justify-center bg-slate-50 rounded-sm border-t-orange-500">
        <h1 className="mb-2 text-4xl font-medium font-['Roboto'] text-black mt-6 w-fit iteneraryHeader backdrop-filter backdrop-blur-[2px] backdrop-contrast-100 rounded-lg"  style={{  marginBottom:20 }}>Itinerary Items</h1>
        
        <div className="absolute left-2 px-4 justify-center items-center">
              <button onClick={handleBack} className="flex items-center mb-4 bg-blue-100 p-2 rounded-md shadow-md hover:bg-blue-200 text-white transition-all ml-4 mt-4" style={{ background: themeStyles.navbarColor}}>
                <FaArrowLeft className="mr-2 text-white" />
                Back
              </button>
        </div>


        <div className='absolute align-center right-8 mt-2 w-22 h-10 mx-4'>
          <Link href={`/booking?id=${id}`}>
            <button className="flex items-center w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4" style={{ background: themeStyles.navbarColor}}>
              <FaCheck className="order-1 ml-2 text-white" />
              <span className="order-0">Done</span>
            </button>    
          </Link>
        </div>
      </div>



      <div className="flex justify-center">
        <div className="ml-2 mr-2">
            <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto text-gray-800"  >
              <DynamicDivs id={id} location={location} destination={destination} />
            </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  </>
    )
}

export default ItemsPage;