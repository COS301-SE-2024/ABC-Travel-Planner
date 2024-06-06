import Image from 'next/image';
import React from 'react';
import ReviewButton from './ReviewButton'; 
import { FaGoogle,FaAtlas } from 'react-icons/fa';
const TouristPage = () => {
  return (
    
    <div className="container" style={{ marginTop:20 }}>
      <div className="photos-section">
      <div className="small-photos">
        <Image src="/Images/photo1.jpg" alt="Photo 1" width={200} height={200} style={{ borderRadius: 8 }} />
        <Image src="/Images/photo2.jpg" alt="Photo 2" width={200} height={200} style={{ borderRadius: 8 }} />
        <Image src="/Images/photo3.jpg" alt="Photo 3" width={200} height={200} style={{ borderRadius: 8 }} />
        <Image src="/Images/photo4.jpg" alt="Photo 4" width={200} height={200} style={{ borderRadius: 8 }} />
      </div>
      <div className="main-photo">
        <Image src="/Images/main.jpg" alt="Main Photo" width={900} height={800} style={{ borderRadius: 8 }} />
      </div>

      </div>
      <div className="info-section">
        <div className="google-street-view">
          <div className="flex items-center">
            <FaGoogle size={22} className="mr-2"  style={{ marginBottom: 10 }}/>
            <h1>Google Earth View</h1>
          </div>
          <iframe
            src="https://earth.google.com/web/@48.8583701,2.2944813,146.72686635a,666.61608691d,35y,222.03759349h,45t,0r/data=Ck8aTRJHCiUweDQ3ZTY2ZTI5NjRlMzRlMmQ6MHg4ZGRjYTllZTM4MGVmN2UwGZ-uSRLfbUhAIb1EBgMZWwJAKgxUb3JyZSBFaWZmZWwYAiABOgMKATA"
            width="100%"
            height="400px"
            allowFullScreen
            frameBorder="0"
            title="Google Earth View"
          ></iframe>
        </div>
        <div className="google-maps-api">
        <div className="flex items-center">
        <FaAtlas size={22} className="mr-2"  style={{ marginBottom: 10 }}/>
          <h1>Google Maps API</h1>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999022047975!2d2.2944813156743517!3d48.85837007928715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66efef2e091ab%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1625840843485!5m2!1sen!2sfr"
            width="100%"
            height="400px"
            allowFullScreen
            frameBorder="0"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
      <div className="attractions-section">
        <h2>Attractions</h2>
        <p>
          Come and discover the Eiffel Tower on the only trip to the top of its kind in Europe, and
          let pure emotions carry you from the esplanade to the top.
        </p>
        <p>
          The Eiffel Tower in the world
          « A vision, an object, a symbol, the Tower is anything that Man wants it to be, and this is infinite.
          A sight that is looked at and which looks back, a structure that is useless and yet irreplaceable, a familiar world and a heroic symbol, the witness to a century passing by and a monument that is always new, an inimitable and yet incessantly imitated object (Translation of Roland Barthes, La tour Eiffel, Ed. Delpirre 1964).
          It was the tallest tower in the world at the time of its construction and has been imitated in various places around the world.
          Overtaken in height by today's great towers, it nevertheless remains unique.
        </p>
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
      </div>
    </div>
  );
};

export default TouristPage;
