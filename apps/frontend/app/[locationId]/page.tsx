// app/[locationId]/page.tsx

import React from 'react';
import Image from 'next/image';
import { FaGoogle, FaAtlas } from 'react-icons/fa';
import getReviews from './getReviews';

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

const TouristPage: React.FC<TouristPageProps> = async ({ params }) => {
  const location_id = params.locationId || 'default_location_id';
  const reviews = await getReviews(location_id);

  return (
    <div data-testid="destinationInfo" className="w-full p-4 md:p-8 bg-gray-100">
      <div className="photos-section grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
        <div className="small-photos flex flex-col gap-4">
          <Image src="/Images/photo1.jpg" alt="Photo 1" width={200} height={200} className="rounded-lg shadow-lg" />
          <Image src="/Images/photo2.jpg" alt="Photo 2" width={200} height={200} className="rounded-lg shadow-lg" />
          <Image src="/Images/photo3.jpg" alt="Photo 3" width={200} height={200} className="rounded-lg shadow-lg" />
          <Image src="/Images/photo4.jpg" alt="Photo 4" width={200} height={200} className="rounded-lg shadow-lg" />
        </div>
        <div className="main-photos col-span-2 grid grid-cols-2 md:grid-cols-2 gap-3">
          <div className="main-photo">
            <Image src="/Images/main.jpg" alt="Photo 1" width={800} height={800} className="rounded-lg shadow-lg" />
          </div>
          <div className="second-photo">
            <Image src="/Images/Paris.jpg" alt="Photo 1" width={900} height={900} className="rounded-lg shadow-lg" />
          </div>
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
        <h1 className="text-2xl font-bold mb-4">Attractions</h1>
        <p className="mb-4">
          Come and discover the Eiffel Tower on the only trip to the top of its kind in Europe, and
          let pure emotions carry you from the esplanade to the top.
        </p>
        <p>
          The Eiffel Tower in the world
        </p>
      </div>
      <div className="w-full p-4 md:p-8 bg-gray-100">
        {/* Reviews section */}
        <div className="reviews-section p-4 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <h1 className="text-2xl font-bold mb-4">Reviews</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reviews.map(review => (
              <div key={review.id} className="review-card bg-white border border-gray-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold">{review.user}</h2>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-gray-600">Rating: {review.rating}</p>
                <p className="text-gray-600">{review.title}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Review submission form */}
        <div className="review-form mt-8 p-4 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <form className="mx-auto max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Post A Review</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            </div>
            <div className="flex items-start mt-4">
              <label htmlFor="comment" className="review-label mr-2 flex-shrink-0 w-24">Comment:</label>
              <textarea id="comment" name="comment" className="review-input h-24 flex-grow" required />
            </div>
            <div className="flex items-center mt-4">
              <label htmlFor="rating" className="review-label mr-2 flex-shrink-0 w-24">Rating:</label>
              <input id="rating" name="rating" type="number" min="1" max="5" className="review-input w-16 mr-2" required />
              <span className="text-gray-600">out of 5</span>
            </div>
            <button type="submit" className="submit-review bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block">
              Submit Review
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default TouristPage;
