import Link from "next/link";

interface destination {
  name: string;
  image: string;
  location_id: string;
  description: string;
}

const DestinationCard = ({ destination }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
      <Link href={`/${destination.location_id}`} passHref>
  
          <img src={destination.image} className="w-full h-48 object-cover" alt={destination.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{destination.name}</div>
            <p className="text-gray-700 text-base">{destination.description}</p>
          </div>
      
      </Link>
    </div>
  );
};

export default DestinationCard;
