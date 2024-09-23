"use server"
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic"; // Import dynamic for client-side component loading
import { cookies } from 'next/headers'
import { truncateTitle } from "../utils/functions/TruncateTitle";
import moment from 'moment';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

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

// Dynamically import ConfirmBookingButton as a client-side component
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
    
    case "carRental":
      return "Car rental"

    case "airport taxi":
      return "Airport taxi"

    default:
      return ""
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

  const convertToRand = (usd: number): number => {
    const exchangeRate = 18; // 1 USD = 18 ZAR
    return usd * exchangeRate;
  };

  const updateTotal = (price: number)  => {
    totalCost += price;
    return price?.toFixed(2) ?? 0;
  }

  const calculateTotal = (items: Item[]): number => {
    return items.reduce((total, item) => total + convertToRand(item.price), 0);
  };

  const flights: Item[] = [
    {
      id: 1,
      name: "Flight to Dubai",
      details: "Non-stop, 14h 30m",
      date: "2024-07-15",
      time: "08:00 AM",
      price: 500,
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      name: "Flight to Spain",
      details: "1 stop, 10h 45m",
      date: "2024-07-20",
      time: "03:00 PM",
      price: 600,
      image: "/images/spain.jpg",
    },
  ];

  const accommodations: Item[] = [
    {
      id: 1,
      name: "Dubai Grand Hotel",
      details: "5-star hotel with luxury amenities",
      checkIn: "2024-07-15",
      checkOut: "2024-07-20",
      price: 800,
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      name: "Spain Boutique Hotel",
      details: "4-star hotel with free breakfast",
      checkIn: "2024-07-20",
      checkOut: "2024-07-25",
      price: 700,
      image: "/images/spain.jpg",
    },
  ];

  const activities: Item[] = [
    {
      id: 1,
      name: "Burj Khalifa Tour",
      details: "Visit the tallest building in the world",
      date: "2024-07-16",
      time: "10:00 AM",
      price: 100,
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      name: "Museum of the Future Tour",
      details: "Explore futuristic innovations and exhibits",
      date: "2024-07-17",
      time: "01:00 PM",
      price: 120,
      image: "/images/dubai.jpg",
    },
    {
      id: 3,
      name: "Night Out at Club Blu Oasis",
      details: "Enjoy a luxurious night out at the top club in Dubai",
      date: "2024-07-18",
      time: "09:00 PM",
      price: 150,
      image: "/images/dubai.jpg",
    },
    {
      id: 4,
      name: "LaLiga Fixture",
      details: "Watch a live LaLiga football match",
      date: "2024-07-21",
      time: "07:00 PM",
      price: 200,
      image: "/images/spain.jpg",
    },
    {
      id: 5,
      name: "Party at HI IBIZA Club",
      details: "Experience the vibrant nightlife at HI IBIZA",
      date: "2024-07-22",
      time: "11:00 PM",
      price: 180,
      image: "/images/spain.jpg",
    },
    {
      id: 6,
      name: "Visit Sagrada Familia",
      details: "Tour the famous Sagrada Familia cathedral in Barcelona",
      date: "2024-07-23",
      time: "10:00 AM",
      price: 160,
      image: "/images/spain.jpg",
    },
  ];

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

  function formatDateGroup(dates: string[]): string {
    if (dates.length === 0) return '';
  
    const parsedDates = dates.map(d => parseISO(d));
    parsedDates.sort((a, b) => a.getTime() - b.getTime());
  
    const groups: { [key: string]: number[] } = {};
  
    parsedDates.forEach(date => {
      const key = format(date, 'MMMM yyyy');
      if (!groups[key]) groups[key] = [];
      groups[key].push(date.getDate());
    });
  
    return Object.entries(groups)
      .map(([monthYear, days]) => {
        const uniqueDays = [...new Set(days)].sort((a, b) => a - b);
        return `${uniqueDays.join(', ')} ${monthYear}`;
      })
      .join('; ');
  }

  const flightTotal = calculateTotal(flights);
  const accommodationTotal = calculateTotal(accommodations);
  const activityTotal = calculateTotal(activities);
  const finalTotal = flightTotal + accommodationTotal + activityTotal;
  let curr_id = id ?? ''
  
  if (!curr_id) {
    curr_id = ''
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
      {data?.map((item: any, index: number) => (
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
                {<div className="text-right">{formatDateGroup(item.date)}</div>}
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
