import Head from "next/head";
import Image from "next/image";
import ConfirmBookingButton from "../booking/ConfirmBookingButton";

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

const Booking = () => {
  const convertToRand = (usd: number): number => {
    const exchangeRate = 18; // 1 USD = 18 ZAR
    return usd * exchangeRate;
  };

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

  const flightTotal = calculateTotal(flights);
  const accommodationTotal = calculateTotal(accommodations);
  const activityTotal = calculateTotal(activities);
  const finalTotal = flightTotal + accommodationTotal + activityTotal;

  return (
    <div className="container mx-auto p-4 relative">
      <Head>
        <title>Book Your Trip</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4 text-center">Book Your Trip</h1>
      <p className="text-center text-gray-700 mb-4">
        Seamless booking for flights, hotels, and activities.
      </p>

      {/* Flights */}
      <div className="max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Flights</h2>
        <ul className="space-y-4">
          {flights.map((flight) => (
            <li
              key={flight.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div className="flex items-center">
                <Image
                  src={flight.image}
                  alt={flight.name}
                  width={150}
                  height={150}
                  className="rounded mr-4"
                />
                <div>
                  <p className="font-bold">{flight.name}</p>
                  <p>{flight.details}</p>
                  <p>Date: {flight.date}</p>
                  <p>Time: {flight.time}</p>
                </div>
              </div>
              <p className="font-bold">R{convertToRand(flight.price).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <p className="font-bold mt-4 text-right">Subtotal: R{flightTotal.toFixed(2)}</p>
      </div>

      {/* Accommodations */}
      <div className="max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Accommodations</h2>
        <ul className="space-y-4">
          {accommodations.map((accommodation) => (
            <li
              key={accommodation.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div className="flex items-center">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  width={150}
                  height={150}
                  className="rounded mr-4"
                />
                <div>
                  <p className="font-bold">{accommodation.name}</p>
                  <p>{accommodation.details}</p>
                  <p>Check-in: {accommodation.checkIn}</p>
                  <p>Check-out: {accommodation.checkOut}</p>
                </div>
              </div>
              <p className="font-bold">R{convertToRand(accommodation.price).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <p className="font-bold mt-4 text-right">Subtotal: R{accommodationTotal.toFixed(2)}</p>
      </div>

      {/* Activities */}
      <div className="max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Activities</h2>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div className="flex items-center">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  width={150}
                  height={150}
                  className="rounded mr-4"
                />
                <div>
                  <p className="font-bold">{activity.name}</p>
                  <p>{activity.details}</p>
                  <p>Date: {activity.date}</p>
                  <p>Time: {activity.time}</p>
                </div>
              </div>
              <p className="font-bold">R{convertToRand(activity.price).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <p className="font-bold mt-4 text-right">Subtotal: R{activityTotal.toFixed(2)}</p>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4 text-right">
        <h2 className="text-xl font-bold mb-4">Total Trip Cost</h2>
        <p className="text-2xl font-bold">R{finalTotal.toFixed(2)}</p>
      </div>

      <div className="flex justify-center">
        <ConfirmBookingButton />
      </div>
    </div>
  );
};

export default Booking;
