import Link from "next/link";

interface destination {
  city: string;
  name: string;
  image: string;
  location_id: string;
  description: string;
}

const DestinationCard = ({ destination }: { destination: destination }) => {
  return (
    <div className="destination-card bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/${destination.location_id}`} passHref>
      
      <img src={destination.image} alt={destination.name} className="w-full h-32 sm:h-48 object-cover"/>
          <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{destination.name}</h3>
          <p className="text-gray-700 text-md mb-1">{destination.city}</p>
          <p className="text-gray-600 text-md">{destination.description}</p>
        </div>
      
      </Link>
    </div>  
  );
};

export default DestinationCard;
