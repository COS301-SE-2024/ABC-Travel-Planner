import Head from "next/head";
import Image from "next/image";
import ConfirmBookingButton from "../booking/ConfirmBookingButton";

const Booking = () => {
  // Updated hardcoded data
  const flights = [
    {
      id: 1,
      name: "Flight to Dubai",
      details: "Non-stop, 14h 30m",
      date: "2024-07-15",
      time: "08:00 AM",
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      name: "Flight to Spain",
      details: "1 stop, 10h 45m",
      date: "2024-07-20",
      time: "03:00 PM",
      image: "/images/spain.jpg",
    },
  ];

  const accommodations = [
    {
      id: 1,
      name: "Dubai Grand Hotel",
      details: "5-star hotel with luxury amenities",
      checkIn: "2024-07-15",
      checkOut: "2024-07-20",
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      name: "Spain Boutique Hotel",
      details: "4-star hotel with free breakfast",
      checkIn: "2024-07-20",
      checkOut: "2024-07-25",
      image: "/images/spain.jpg",
    },
  ];

  const activities = [
    {
      id: 1,
      name: "Burj Khalifa Tour",
      details: "Visit the tallest building in the world",
      date: "2024-07-16",
      time: "10:00 AM",
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      name: "Museum of the Future Tour",
      details: "Explore futuristic innovations and exhibits",
      date: "2024-07-17",
      time: "01:00 PM",
      image: "/images/dubai.jpg",
    },
    {
      id: 3,
      name: "Night Out at Club Blu Oasis",
      details: "Enjoy a luxurious night out at the top club in Dubai",
      date: "2024-07-18",
      time: "09:00 PM",
      image: "/images/dubai.jpg",
    },
    {
      id: 4,
      name: "LaLiga Fixture",
      details: "Watch a live LaLiga football match",
      date: "2024-07-21",
      time: "07:00 PM",
      image: "/images/spain.jpg",
    },
    {
      id: 5,
      name: "Party at HI IBIZA Club",
      details: "Experience the vibrant nightlife at HI IBIZA",
      date: "2024-07-22",
      time: "11:00 PM",
      image: "/images/spain.jpg",
    },
    {
      id: 6,
      name: "Visit Sagrada Familia",
      details: "Tour the famous Sagrada Familia cathedral in Barcelona",
      date: "2024-07-23",
      time: "10:00 AM",
      image: "/images/spain.jpg",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Book Your Trip</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Book Your Trip</h1>
      <div className="max-w-md mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4">
        {/* Flights */}
        <h2 className="text-xl font-bold mb-4">Flights</h2>
        <ul className="space-y-4">
          {flights.map((flight) => (
            <li key={flight.id} className="p-4 border rounded flex items-center">
              <Image src={flight.image} alt={flight.name} width={100} height={100} className="rounded mr-4" />
              <div>
                <p className="font-bold">{flight.name}</p>
                <p>{flight.details}</p>
                <p>Date: {flight.date}</p>
                <p>Time: {flight.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-md mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4">
        {/* Accommodations */}
        <h2 className="text-xl font-bold mb-4">Accommodations</h2>
        <ul className="space-y-4">
          {accommodations.map((accommodation) => (
            <li key={accommodation.id} className="p-4 border rounded flex items-center">
              <Image src={accommodation.image} alt={accommodation.name} width={100} height={100} className="rounded mr-4" />
              <div>
                <p className="font-bold">{accommodation.name}</p>
                <p>{accommodation.details}</p>
                <p>Check-in: {accommodation.checkIn}</p>
                <p>Check-out: {accommodation.checkOut}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-md mx-auto bg-gray-200 rounded-lg shadow-lg p-6 mb-4">
        {/* Activities */}
        <h2 className="text-xl font-bold mb-4">Activities</h2>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4 border rounded flex items-center">
              <Image src={activity.image} alt={activity.name} width={100} height={100} className="rounded mr-4" />
              <div>
                <p className="font-bold">{activity.name}</p>
                <p>{activity.details}</p>
                <p>Date: {activity.date}</p>
                <p>Time: {activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmBookingButton />
    </div>
  );
};

export default Booking;
