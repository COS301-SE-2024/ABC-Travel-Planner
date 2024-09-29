"use server"
import axios from 'axios';
import { cookies } from 'next/headers'
import BookingPage from './BookingPage';

const Booking = async ({ searchParams}: { searchParams: { id?: any; }}) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const cookieStore = cookies()
  const cookie = cookieStore.get('user_id')
  const curr_user = cookie?.value;
  const { id } = searchParams;

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
    <BookingPage data={data} />
  );
};

export default Booking;