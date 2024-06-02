import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope,FaClock } from 'react-icons/fa';

const colors = {
  primary: '#333',
  secondary: '#666',
  accent: '#ccc',
};
async function fetchImage(locationId: any) {
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=E2F7795203BC41B981DFD021E4C97B4B`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(imageUrl, options);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      if (data.data[0].images.original?.url) {
        return data.data[0].images.original.url;
      } else if (data.data[0].images.large?.url) {
        return data.data[0].images.large.url;
      } else if (data.data[0].images.small?.url) {
        return data.data[0].images.small.url;
      }
    } else {
      return null;
    }

  } catch (err) {
    console.error(`Error fetching image for location ${locationId}:`, err);
    return null;
  }
}

const fetchData = async (locationId: any) => {
  if (!locationId) return;

  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=E2F7795203BC41B981DFD021E4C97B4B`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const [imageUrl, detailsResponse] = await Promise.all([
      fetchImage(locationId), fetch(url, options).then(response => response.json())
    ]);

    if (detailsResponse) {
      const detailedData = {
        ...detailsResponse,
        image: imageUrl,
      };
      console.log("Fetched detailed data with image:", detailedData);
      return detailedData;
    } else {
      console.error(`No data found for locationId ${locationId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching destination data for locationId ${locationId}:`, error);
  }
};

export default async function DestinationPage({ params, searchParams }: {
  params: { locationId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(params.locationId);
  const destinationData = await fetchData(params.locationId);

  if (!destinationData) {
    return <div>No data found for this destination.</div>;
  }

  return (
    <div className="container mx-auto p-4">
       <h1 className="text-2xl font-bold mb-4 text-center">{destinationData.name}</h1>
       <div className="rounded shadow-lg p-4 bg-white">
        {destinationData.image && (
          <div className="flex justify-center">
            <img
              src={destinationData.image}
              alt={destinationData.name}
              className="w-64 h-64 object-cover rounded mb-4"
            />
          </div>
        )}
        </div>
       <div className="rounded shadow-lg p-4 bg-white flex justify-center items-center">
        
        <table className="min-w-full bg-white border">
          <tbody>
            {destinationData.description && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Description</td>
                <td className="border px-4 py-2">{destinationData.description}</td>
              </tr>
            )}
            {destinationData.phone && (
              <tr>
              <td className="border px-4 py-2 font-semibold"><FaPhone style={{ color: colors.primary }} />Phone</td>
              <td className="border px-4 py-2">{destinationData.phone}</td>
            </tr>
            )}
            {destinationData.website && (
              <tr>
              <td className="border px-4 py-2 font-semibold">Website</td>
              <td className="border px-4 py-2"><a href={destinationData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{destinationData.website}</a></td>
            </tr>
            )}
            {destinationData.address_obj && (
             <tr>
             <td className="border px-4 py-2 font-semibold"><FaMapMarkerAlt style={{ color: colors.primary }} />Address</td>
             <td className="border px-4 py-2">{destinationData.address_obj.address_string}</td>
           </tr>
            )}
            {destinationData.timezone && (
              <tr>
              <td className="border px-4 py-2 font-semibold"><FaClock style={{ color: colors.primary }} />TimeZone</td>
              <td className="border px-4 py-2">{destinationData.timezone}</td>
            </tr>
            )}
            {destinationData.rating && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Rating</td>
                <td className="border px-4 py-2">{destinationData.rating}</td>
              </tr>
            )}
            {destinationData.num_reviews && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Number of Reviews</td>
                <td className="border px-4 py-2">{destinationData.num_reviews}</td>
              </tr>
            )}
            {destinationData.ranking && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Ranking</td>
                <td className="border px-4 py-2">{destinationData.ranking}</td>
              </tr>
            )}
            {destinationData.ranking_position && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Ranking Position</td>
                <td className="border px-4 py-2">{destinationData.ranking_position}</td>
              </tr>
            )}
            {destinationData.subcategory && destinationData.subcategory.length > 0 && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Subcategories</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc list-inside">
                    {destinationData.subcategory.map((subcat: any, index: number) => (
                      <li key={index}>{subcat.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {destinationData.trip_types && destinationData.trip_types.length > 0 && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Trip Types</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc list-inside">
                    {destinationData.trip_types.map((tripType: any, index: number) => (
                      <li key={index}>{tripType.localized_name} ({tripType.value})</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {destinationData.awards && destinationData.awards.length > 0 && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Awards</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc list-inside">
                    {destinationData.awards.map((award: any, index: number) => (
                      <li key={index}>{award.display_name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {destinationData.email && (
              <tr>
              <td className="border px-4 py-2 font-semibold"><FaEnvelope style={{ color: colors.primary }} />Email</td>
              <td className="border px-4 py-2">{destinationData.email}</td>
            </tr>
            )}
            {destinationData.location_category && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Location Category</td>
                <td className="border px-4 py-2">{destinationData.location_category.name}</td>
              </tr>
            )}
            {destinationData.latitude && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Latitude</td>
                <td className="border px-4 py-2">{destinationData.latitude}</td>
              </tr>
            )}
            {destinationData.longitude && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Longitude</td>
                <td className="border px-4 py-2">{destinationData.longitude}</td>
              </tr>
            )}
            {destinationData.location_string && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Location String</td>
                <td className="border px-4 py-2">{destinationData.location_string}</td>
              </tr>
            )}
            {destinationData.type_of_trip && (
              <tr>
                <td className="border px-4 py-2 font-semibold">Type of Trip</td>
                <td className="border px-4 py-2">{destinationData.type_of_trip}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
