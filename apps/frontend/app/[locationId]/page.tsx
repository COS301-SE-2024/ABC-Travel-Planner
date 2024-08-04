import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { FaGoogle, FaAtlas, FaHome, FaGlobe, FaPhone, FaStar, FaUsers, FaInfoCircle } from 'react-icons/fa';
import { addReview, getReviews } from './getReviews';
import dynamic from 'next/dynamic';
import BackButton from '../[locationId]/BackButton';
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

// Dynamically import PhotoGallery component to ensure it's client-side only
const PhotoGallery = dynamic(() => import('../[locationId]/PhotoGallery'), { ssr: false });

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
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const starRating = Array.from({ length: Math.floor(data.rating) }, (_, i) => i);

  return (
    <div className="w-full p-4 md:p-8 bg-gray-100" data-testid="destinationInfo">
      <BackButton />
      <h1 className="text-5xl font-bold mb-4 text-gray-800 text-center">{data.displayName}</h1>

      <PhotoGallery photos={data.photos} />
      <div className="info-section grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="google-street-view p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <div className="flex items-center mb-4">
            <FaGoogle size={22} className="mr-2" />
            <h1 className="text-3xl font-bold">Google Street View</h1>
          </div>
          <iframe
            src={`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${locationLat},${locationLon}`}
            width="100%"
            height="400px"
            allowFullScreen
            frameBorder="0"
            title="Google Street View"
            className="rounded-lg"
          ></iframe>
        </div>

        <div className="google-maps-api p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <div className="flex items-center mb-4">
            <FaAtlas size={22} className="mr-2" />
            <h1 className="text-3xl font-bold">Google Maps Ariel View</h1>
          </div>
          <iframe
            src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${locationLat},${locationLon}&zoom=18&maptype=satellite`}
            width="100%"
            height="400px"
            allowFullScreen
            frameBorder="0"
            title="Google Maps Ariel View"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
      <div className="attractions-section bg-blue-200 rounded-lg shadow-lg mb-8 p-6 flex" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
  {/* <!-- Left Side: Name and Summary --> */}
  <div className="left-side bg-white rounded-lg shadow-md p-6 flex-1">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">Need more info ?</h1>
    <div className="flex items-center text-gray-600">
        <FaInfoCircle className="mr-2 text-3xl text-gray-600" />
        <span><strong>Summary:</strong> {data.formattedAddress}</span>
      </div>
  </div>

  {/* <!-- Right Side: Additional Info --> */}
  <div className="right-side bg-white rounded-lg shadow-md p-6 ml-6 flex-1">
    <div className="info-details space-y-4">
      <div className="flex items-center text-gray-600">
        <FaHome className="mr-2 text-gray-600" />
        <span><strong>Address:</strong> {data.formattedAddress}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <FaGlobe className="mr-2 text-gray-600" />
        <span><strong>Website:</strong> <a href={data.websiteUri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{data.websiteUri}</a></span>
      </div>
      <div className="flex items-center text-gray-600">
        <FaPhone className="mr-2 text-gray-600" />
        <span><strong>Int Phone:</strong> {data.internationalPhoneNumber}</span>
      </div>
       <div className="flex items-center text-gray-600">
              <span className="flex items-center"><strong>Rating:</strong> 
                {starRating.map((_, index) => (
                  <FaStar key={index} className="mr-1 text-yellow-500" />
                ))}
              </span>
            </div>
      <div className="flex items-center text-gray-600">
        <FaUsers className="mr-2 text-gray-600" />
        <span><strong>User rating count:</strong> {data.userRatingCount}</span>
      </div>
    </div>
  </div>
</div>




      <div className="w-full p-4 md:p-8 bg-gray-100">
        {/* Reviews section */}
        <div className="reviews-section p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
    <h1 className="text-3xl font-bold mb-6 text-Gray-800">Reviews</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.reviews.map((review: any) => (
        <div key={review.id} className="review-card bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Image src={`${review.authorAttribution.photoUri}`} alt="Reviewer Photo" width={80} height={80} className="rounded-full border border-gray-300" />
            <div className="review-details flex-1">
              <h2 className="text-xl font-semibold mb-1 text-blue-700">{review.authorAttribution.displayName}</h2>
              <p className="text-gray-600"><strong>Posted:</strong> {review.relativePublishTimeDescription}</p>
              <p className="text-gray-600"><strong>Rating:</strong> {review.rating}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.originalText.text}</p>
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
