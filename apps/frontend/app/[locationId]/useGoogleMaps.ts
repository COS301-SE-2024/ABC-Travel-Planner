import { useEffect } from 'react';

const useGoogleMaps = (apiKey: string, callback: () => void) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, callback]);
};

export default useGoogleMaps;
