import React, { Suspense } from 'react';
import TripComponent from './tripComponent'; // Adjust the path as necessary

const Page = () => {
  return (
    <Suspense>
      <TripComponent />
    </Suspense>
  );
};

export default Page;