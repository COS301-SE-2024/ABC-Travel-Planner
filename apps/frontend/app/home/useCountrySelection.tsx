"use client";
import { useState } from 'react';

const useCountrySelection = (allLocations: any[]) => {
  const [filteredLocations, setFilteredLocations] = useState(allLocations);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    if (selectedCountry) {
      const matchedLocations = allLocations.filter(location => location.city === selectedCountry);
      setFilteredLocations(matchedLocations);
    } else {
      setFilteredLocations(allLocations);
    }
  };

  return { filteredLocations, handleCountryChange };
};

export default useCountrySelection;
