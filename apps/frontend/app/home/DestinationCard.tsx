import Link from "next/link";

interface destination {
  city: string;
  name: string;
  image: string;
  location_id: string;
  description: string;
}

const DestinationCard = ({ destination }: { destination: destination }) => {
  const { name, image, city = 'Unknown', location_id = '0', description = 'Description not available' } = destination;

  return (
    <div data-testid="destinationCard" className="destination-card bg-white rounded-lg shadow-md overflow-hidden">
      <Link data-testid="DestinationLink" href={`/${location_id}`} passHref>
        <img data-testid="destinationImage" src={image} alt={name} className="w-full h-32 sm:h-48 object-cover"/>
        <div className="p-4">
          <h3 data-testid="destinationName" className="text-lg font-bold mb-2">{name}</h3>
          <p className="text-gray-700 text-md mb-1">{city}</p>
          <p data-testid="destinationDescription" className="text-gray-600 text-md">{description}</p>
        </div>
      </Link>
    </div>  
  );
};


export default DestinationCard;
