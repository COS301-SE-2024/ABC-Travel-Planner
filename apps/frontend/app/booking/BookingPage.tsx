"use client"
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic"; // Import dynamic for client-side component loading
import { truncateTitle } from "../utils/functions/TruncateTitle";
import moment from 'moment';
import { format, parseISO } from 'date-fns';
import { createNewDates } from '../utils/functions/convertDates'
import { useTheme } from '../context/ThemeContext';

const checkType = (type: string) => {
    switch (type) {
      case "attractions":
        return "Attraction"
    
      case "flights":
        return "Flight"
      
      case "stays":
        return "A place to stay"
      
      case "car rental":
        return "Car rental"
  
      case "airport taxi":
        return "Airport taxi"
  
      default:
        return type
    }
  }
  
  function formatDate(date: number) {
    return moment.unix(date).format('D MMM YYYY: HH:mm');
  }

interface BookingPageProps {
    data: any,
}
  
interface Item {
    id: number;
    name: string;
    details: string;
    date?: string;
    time?: string;
    checkIn?: string;
    checkOut?: string;
    price: number;
    image: string;
  }
  
  const ConfirmBookingButton = dynamic(() => import('./ConfirmBookingButton'), {
    ssr: false, // Ensure the component is not server-side rendered
  });


const BookingPage:React.FC<BookingPageProps> = ({data}) => {
    const { selectedTheme, themeStyles, setTheme } = useTheme();
    let totalCost = 0;

    const updateTotal = (price: number)  => {
        totalCost += price;
        return price?.toFixed(2) ?? 0;
    }

    return (
        <div className="container mx-auto p-4 relative" style={{minHeight: '100vh'}}>
        <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: themeStyles.textColor }}>Book Your Trip</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            
        {/* Item cards */}
        {data?.map((item: any) => (
            <div key={item.id} className="rounded-lg shadow-lg p-4" style={{ backgroundColor: themeStyles.primaryColor }}>
                <Image
                src={item.image_url}
                alt={item.item_name}
                width={400}
                height={300}
                style={{ maxHeight: '190px', maxWidth: '345x' }} 
                className="rounded mb-4"
                />
                <div className="font-medium">
                <div className="font-bold text-lg">
                    <h1 style={{ color: themeStyles.textColor }}>{truncateTitle(item.item_name, 30)}</h1>
                </div>

                <div className="flex justify-between mb-1" style={{ color: themeStyles.textColor }}>
                    <div className="font-bold text-left">Type:</div>
                    <div className="text-right">{checkType(item.item_type)}</div>
                </div>

                <div className="flex justify-between mb-1" style={{ color: themeStyles.textColor }}>
                    <div className="font-bold text-left">Address:</div>
                    <div className="text-right">{item.destination}</div>
                </div>

                <div className="flex justify-between mb-1" style={{ color: themeStyles.textColor }}>
                    <div className="font-bold text-left">Date:</div>
                    {<div className="text-right">{item.date.length === 0 ? 'No Date selected' : createNewDates(item.date)}</div>}
                </div>

                <div className="flex justify-between mb-1" style={{ color: themeStyles.textColor }}>
                    <div className="font-bold text-left">Time added:</div>
                    <div className="text-right">{formatDate(item.timestamp._seconds)}</div>
                </div>

                <h1 className="text-lg text-right" style={{ color: themeStyles.textColor }}>R{updateTotal(item.price ?? 0)}</h1>
                </div>
            </div>
            ))}       
        </div>

        {/* Total Card with Confirm Booking Button */}
        <div className="flex justify-center mt-4">
            <div className="w-full max-w-4xl bg-blue-300 rounded-lg shadow-lg p-6 relative text-center" style={{ backgroundColor: themeStyles.primaryColor}}>
            <h2 className="text-xl font-bold mb-4" style={{ color: themeStyles.textColor }}>Total: </h2>
            <h3 className="font-bold mb-4" style={{ color: themeStyles.textColor }}>R{totalCost.toFixed(2) ?? 0}</h3>
            <div className="mt-4">
                <ConfirmBookingButton items={data}/> {/* Render the client-side component here */}
            </div>
            </div>
        </div>
        </div>
    );
}
export default BookingPage;