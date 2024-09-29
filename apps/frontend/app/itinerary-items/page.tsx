
import ItemsPage from './ItemsPage';

// const getCoordinates = async (location: string) => {
//   const encodedAddress = encodeURIComponent(location);
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === 'OK') {
//       const location = data.results[0].geometry.location;
//       console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
//     } else {
//       console.error(`Error: ${data.status}`);
//     }
//   } catch (error) {
//     console.error('Error fetching geocode data:', error);
//   }
// };

const ItineraryItems = async ({ searchParams }: { searchParams: { id?: any; location?: string; destination?: any } }) => {
  const { location, id, destination } = searchParams;

  return (
      <ItemsPage id ={id} location={location} destination={destination}/>
  );
};
  
export default ItineraryItems;