import React from 'react';

async function fetchImage(locationId: any) {
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=EA30B923BE4A4CB28EE695CDFFEB1DE7`;
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

  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=A3B74876C98B4350AD1788B581E6F381`;
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Destination Page</h1>
        <div className="rounded shadow-lg p-4">
          <img src={destinationData.image} alt={destinationData.name} className="w-full h-64 object-cover rounded mb-4" />
          <h2 className="text-xl font-bold mb-2">{destinationData.name}</h2>
          <p>{destinationData.description ? destinationData.description : ""}</p>
          <p>{destinationData.phone ? destinationData.phone : ""}</p>
          <p>{destinationData.website ? destinationData.website : ""}</p>
          <p>{destinationData.timezone ? destinationData.timezone : ""}</p>
          <p>Ranking details <span>{destinationData.ranking_data ? destinationData.ranking_data.ranking_string : ""}</span></p>
          <p>Location Category <span>{destinationData.category ? destinationData.category.name : ""}</span></p>
          <p>Location Subcategory <span>{destinationData.subcategory && destinationData.subcategory[0] ? destinationData.subcategory[0].name : ""}</span></p> {/*This can be a loop */}
          <p>Location Subcategory <span>{destinationData.subcategory && destinationData.subcategory[1] ? destinationData.subcategory[1].name : ""}</span></p>
          <p className="text-gray-700 mb-2">{destinationData.address_obj ? destinationData.address_obj.address_string: ''}</p>
          <div className="flex items-center mb-4">
            {Array.from({ length: destinationData.rating }, (_, i) => (
              <svg key={i} className="w-6 h-6 fill-current text-yellow-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2c-.3 0-.6.1-.8.4l-4.2 6.4-6.3.9c-.4.1-.6.5-.5.9.1.3.4.6.8.6h7.2l2.6 6.8c.1.2.3.3.5.3s.4-.1.5-.3l2.6-6.8h7.2c.4 0 .7-.3.8-.6.1-.4-.1-.8-.5-.9l-6.3-.9-4.2-6.4c-.2-.4-.5-.5-.8-.5z" />
              </svg>
            ))}
          </div>
        </div>
    </div>
  );
};

