"use server"
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic"; // Import dynamic for client-side component loading
import { cookies } from 'next/headers'
import { truncateTitle } from "../utils/functions/TruncateTitle";
import moment from 'moment';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { createNewDates } from '../utils/functions/convertDates'

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

const Booking = async ({ searchParams}: { searchParams: { id?: any; }}) => {
  const cookieStore = cookies()
  const cookie = cookieStore.get('user_id')
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const curr_user = cookie?.value;
  const { id } = searchParams;
  let totalCost = 0;

  const updateTotal = (price: number)  => {
    totalCost += price;
    return price?.toFixed(2) ?? 0;
  }

  const fetchItems = async() => {
    try {
      const response = await axios.get(`${backendUrl}/itinerary-items/${id}/${curr_user}`);
      console.log("RESPONSE FROM SERVER: " + JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error); // Handle the error
      return [];
    }
  }

  let curr_id = id ?? ''
  
  if (!curr_id) {
    curr_id = 'NOIDFOUND'
  }

  const data: any[] = await fetchItems();

  return (
    <div className="container mx-auto p-4 relative">
      <Head>
        <title>Book Your Trip</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4 text-center">Book Your Trip</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        
       {/* Item cards */}
      {data?.map((item: any) => (
          <div key={item.id} className="rounded-lg shadow-lg p-4" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
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
                <h1>{truncateTitle(item.item_name, 30)}</h1>
              </div>

              <div className="flex justify-between mb-1">
                <div className="font-bold text-left">Type:</div>
                <div className="text-right">{checkType(item.item_type)}</div>
              </div>

              <div className="flex justify-between mb-1">
                <div className="font-bold text-left">Address:</div>
                <div className="text-right">{item.destination}</div>
              </div>

              <div className="flex justify-between mb-1">
                <div className="font-bold text-left">Date:</div>
                {<div className="text-right">{item.date.length === 0 ? 'No Date selected' : createNewDates(item.date)}</div>}
              </div>

              <div className="flex justify-between mb-1">
                <div className="font-bold text-left">Time added:</div>
                <div className="text-right">{formatDate(item.timestamp._seconds)}</div>
              </div>

              <h1 className="text-lg text-right ">R{updateTotal(item.price ?? 0)}</h1>
            </div>
          </div>
        ))}       
      </div>

      {/* Total Card with Confirm Booking Button */}
      <div className="flex justify-center mt-4">
        <div className="w-full max-w-4xl bg-blue-300 rounded-lg shadow-lg p-6 relative text-center" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <h2 className="text-xl font-bold mb-4">Total: </h2>
          <p className="font-bold mb-4">R{totalCost.toFixed(2) ?? 0}</p>
          <div className="mt-4">
            <ConfirmBookingButton items={data}/> {/* Render the client-side component here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

function then(arg0: (response: any) => void) {
  throw new Error("Function not implemented.");
}
