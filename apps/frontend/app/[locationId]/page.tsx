import Image from 'next/image';
import React from 'react';
import { FaGoogle, FaAtlas } from 'react-icons/fa';
import ReviewButton from './ReviewButton';

const TouristPage = () => {
  return (
    <div className="w-full p-4 md:p-8 bg-gray-100">
      <div className="photos-section grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)'}}>
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
        <div className="google-street-view p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)'}}>
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
        <div className="google-maps-api p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)'}}>
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
      <div className="attractions-section p-4 bg-white rounded-lg shadow-lg mb-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)'}}>
        <h1 className="text-2xl font-bold mb-4">Attractions</h1>
        <p className="mb-4">
          Come and discover the Eiffel Tower on the only trip to the top of its kind in Europe, and
          let pure emotions carry you from the esplanade to the top.
        </p>
        <p>
          The Eiffel Tower in the world
        </p>
      </div>
      <div className="reviews-section p-4 bg-white  shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)'}}>
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        {/* <ReviewButton /> */}
      </div>
    </div>
  );
};

export default TouristPage;
