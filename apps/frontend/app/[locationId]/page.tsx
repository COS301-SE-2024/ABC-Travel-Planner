import React from 'react';
import Image from 'next/image';
import { FaGoogle, FaAtlas } from 'react-icons/fa';
import { addReview, getReviews } from './getReviews';

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
  title: string;
}

interface TouristPageProps {
  params: { locationId: string };
}

async function getDetailedData(locationId: any) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = `${backendUrl}/search/detailedPlace?locationId=${encodeURIComponent(locationId)}`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const TouristPage: React.FC<TouristPageProps> = async ({ params }: { params: { locationId: string } }) => {
  const location_id = params.locationId || 'default_location_id';
  const data = await getDetailedData(location_id);

  if (!data || !data.locationDetails) {
    return (
      <div className="w-full p-4 md:p-8 bg-gray-100" data-testid="destinationInfo">
        <p>Error: Unable to load location details. Please try again later.</p>
      </div>
    );
  }
  
  let locationLat = data.locationDetails.latitude;
  let locationLon = data.locationDetails.longitude;
  console.log(locationLat + " " + locationLon);
  console.log(JSON.stringify(data));

  return (
    <div className="w-full p-4 md:p-8 bg-gray-100" data-testid="destinationInfo">
      <div className="photos-section grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
        <div className="small-photos flex flex-col gap-4">
          {Array.isArray(data.photos) && data.photos.length > 0 ? (data.photos.slice(2, 7).map((photo: any) => (
            <div key={photo}><img src={`${photo}`} alt="Photo 1" width={200} height={200} className="rounded-lg shadow-lg" /></div>
              
            ))) : (
              <p>No photos available</p>
            )}
        </div>
        <div className="main-photos col-span-2 grid grid-cols-2 md:grid-cols-2 gap-3">
        {data.photos.slice(0, 2).map((photo: string, index: number) => (
            <div key={photo} className="main-photo">
              <Image src={`${photo}`} alt={`Photo ${index + 1}`} width={800} height={800} className="rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
      </div>
      <div className="info-section grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="google-street-view p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <div className="flex items-center mb-4">
            <FaGoogle size={22} className="mr-2" />
            <h1 className="text-2xl font-semibold">Google Earth View</h1>
          </div>
          <iframe
            src="https://earth.google.com/web/@48.8583701,2.2944813,146.72686635a,666.61608691d,35y,222.03759349h,45t,0r/data=Ck8aTRJHCiUweDQ3ZTY2ZTI5NjRlMzRlMmQ6MHg4ZGRjYTllZTM4MGVmN2UwGZ-uSRLfbUhAIb1EBgMZWwJAKgxUb3JyIEVhcnRoIFZpZXcYAiABOgMKATA"
            width="100%"
            height="400px"
            allowFullScreen
            frameBorder="0"
            title="Google Earth View"
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="google-maps-api p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <div className="flex items-center mb-4">
            <FaAtlas size={22} className="mr-2" />
            <h1 className="text-2xl font-semibold">Google Maps</h1>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999022047975!2d2.2944813156743517!3d48.85837007928715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66efef2e091ab%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1625840843485!5m2!1sen!2sfr"
            width="100%"
            height="400px"
            allowFullScreen
            frameBorder="0"
            title="Google Maps"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
      <div className="attractions-section p-4 bg-white rounded-lg shadow-lg mb-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
        <h1 className="text-2xl font-bold mb-4">{data.displayName}</h1>
        <p className="mb-4">
          {data.editorialSummary}
        </p>
        <p>
          Address: {data.formattedAddress}
        </p>
        <p>
          Website: {data.websiteUri}
        </p>
        <p>
          Int Phone: {data.internationalPhoneNumber}
        </p>
        <p>
          Rating: {data.rating}
        </p>
        <p>
          User rating count: {data.userRatingCount}
        </p>
      </div>
      <div className="w-full p-4 md:p-8 bg-gray-100">
        {/* Reviews section */}
        <div className="reviews-section p-4 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <h1 className="text-2xl font-bold mb-4">Reviews</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.reviews.map((review: any) => (
              <div key={review.id} className="review-card bg-white border border-gray-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold">{review.authorAttribution.displayName}</h2>
                <p className="text-gray-600">{review.originalText.text}</p>
                <p className="text-gray-600"><b>Posted:</b> {review.relativePublishTimeDescription}</p>
                <p className="text-gray-600"><b>Rating:</b> {review.rating}</p>
                <Image src={`${review.authorAttribution.photoUri}`} alt="Photo 1" width={40} height={40} className="rounded-lg shadow-lg" />
              </div>
            ))}
          </div>
        </div>


        {/* Review submission form */}
        <div className="review-form mt-8 p-4 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          {/* <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4 text-center">Post A Review</h1>
            <div className="flex items-start mt-4">
              <label htmlFor="rating" className="block font-semibold text-lg">Rating:</label>
              <input
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                required
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
              />
            </div>
            <label htmlFor="comment" className="block font-semibold text-lg">Comment:</label>
            <textarea
              name="comment"
              id="comment"
              rows={4}
              required
              className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            ></textarea>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit Review
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default TouristPage;