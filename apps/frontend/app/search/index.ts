"use server";
import createSupabaseServerClient from '@/libs/supabase/server';
import { Loader } from "@googlemaps/js-api-loader";

export const handleSearchAirports = async (destination: any) => {
    const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        let { data: Airports, error } = await supabase.from('Airports').select('*').ilike('country_name', `%${destination}%`);
        console.log("SEARCH TERM " + destination);
};

export const handleSearchStays = async (destination: string) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyAZ7SxKEm5uPIX5_TgtU33zjPR1M-fTkdg',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'
        },
        // body: '{\n  "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"\n}',
        body: JSON.stringify({
            'textQuery': 'Spicy Vegetarian Food in Sydney, Australia'
        })
    });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const additionalOptions = {};
// [START maps_programmatic_load_promise]
const loader = new Loader({
  apiKey: "AIzaSyAZ7SxKEm5uPIX5_TgtU33zjPR1M-fTkdg",
  version: "weekly",
  ...additionalOptions,
});
loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const request = {
        textQuery: 'Tacos in Mountain View',
        fields: ['displayName', 'location', 'businessStatus'],
        includedType: 'restaurant',
        locationBias: { lat: 37.4161493, lng: -122.0812166 },
        isOpenNow: true,
        language: 'en-US',
        maxResultCount: 8,
        minRating: 3.2,
        region: 'us',
        useStrictTypeFiltering: false,
    };
    
    //@ts-ignore
    console.log("SEARCH TERM " + destination);
    const { places } = await Place.searchByText(request);
    if (places.length) {
        console.log(JSON.stringify(places));
    }
});

      
};