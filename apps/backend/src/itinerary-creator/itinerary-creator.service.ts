import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

export interface Place {
  formattedAddress: string;
  displayName: string;
  editorialSummary: string;
  userRatingCount: number;
  plusCode: any;
  id: string;
  rating: number;
  accessibilityOptions: any;
  paymentOptions: any;
  goodForChildren: boolean;
  firstPhotoUrl: string;
  type: string;
  price: number;
}

type Places = {
  stays: Place[];
  attractions: Place[];
  carRentals: Place[];
  airportTaxis: Place[];
};

@Injectable()
export class ItineraryCreatorService {
  private country: string;
  private reason: string;
  private interests: string;
  private wantCarRental: boolean;
  constructor(private readonly searchService: SearchService) {

  }

  async generateItineraryStrings(
    country: string,
    reason: string,
    interests: string,
    wantCarRental: boolean
  ): Promise<{ stays: string; attractions: string; carRentals: string; airportTaxis: string }> {
    this.country = country;
    this.reason = reason;
    this.interests = interests;
    this.wantCarRental = wantCarRental;
   
    const searchStrings = {
      stays: [
        `Best hotels for ${reason} in ${country} with ${interests}`,
        `Top-rated accommodations for ${reason} in ${country} focusing on ${interests}`,
        `Affordable stays for ${reason} in ${country} with interest in ${interests}`,
        `Luxury hotels for ${reason} in ${country} catering to ${interests}`,
        `Boutique hotels for ${reason} in ${country} near ${interests}`,
        `Family-friendly hotels for ${reason} in ${country} with ${interests}`,
        `Hotels with great amenities for ${reason} in ${country} focused on ${interests}`,
        `Budget hotels for ${reason} in ${country} with ${interests}`,
        `Eco-friendly stays for ${reason} in ${country} related to ${interests}`,
        `Unique accommodations for ${reason} in ${country} considering ${interests}`
      ],
      attractions: [
        `Top ${interests} tourist spots in ${country}`,
        `Top ${interests} activities in ${country}`,
        `Top ${interests} destinations in ${country}`,
        `${interests} in ${country}`
      ],
      carRentals: [
        `Best car rental services in ${country}`,
        `Affordable car rentals in ${country}`,
        `Luxury car rentals in ${country}`,
        `Family-friendly car rentals for ${reason} in ${country}`,
        `Eco-friendly car rentals in ${country}`,
        `Reliable car rental agencies in ${country}`,
        `Convenient car rentals in ${country}`,
        `Best-rated car rentals in ${country}`
      ],
      airportTaxis: [
        `Reliable airport taxis in ${country}`,
        `Affordable airport taxis in ${country}`,
        `Luxury airport taxi services for ${reason} in ${country}`,
        `Family-friendly airport taxis for ${reason} in ${country}`,
        `Best-rated airport taxis in ${country}`,
        `24/7 airport taxis in ${country}`,
        `Convenient airport taxis in ${country}`
      ]
    };

    // Helper function to get a random item from an array
    const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    return {
      stays: getRandomItem(searchStrings.stays),
      attractions: getRandomItem(searchStrings.attractions),
      carRentals: getRandomItem(searchStrings.carRentals),
      airportTaxis: getRandomItem(searchStrings.airportTaxis)
    };
  }

  async getPlacesFromGoogleMaps(searchStrings: { stays: string; attractions: string; carRentals: string; airportTaxis: string }): Promise<{ stays: any[]; attractions: any[]; carRentals: any[]; airportTaxis: any[] }> {
    const categories: (keyof typeof searchStrings)[] = ['stays', 'attractions', 'carRentals', 'airportTaxis'];
    const places = {
      stays: [] as Place[],
      attractions: [] as Place[],
      carRentals: [] as Place[],
      airportTaxis: [] as Place[]

    };
    console.log(searchStrings);

    const promises = categories.map(async (category) => {
      if (category == "carRentals" && !this.wantCarRental) {
        console.log('returns');
        return;  // Skip car rentals if the user doesn't want it
    }
        const searchString = searchStrings[category];
        const response = await this.searchService.searchPlaces(searchString, category);
        places[category] = response;
      
    });

    await Promise.all(promises);
    

    return places;
  }

  async selectBestOptions(places: Places): Promise<{ places: Place[]; country: string }> {
    const combinedPlaces = [
      ...places.stays.map(place => ({ ...place, type: 'stays' })),
      ...places.attractions.map(place => ({ ...place, type: 'attractions' })),
      ...(this.wantCarRental ? places.carRentals.map(place => ({ ...place, type: 'carRentals' })) : []),
      ...places.airportTaxis.map(place => ({ ...place, type: 'airportTaxis' }))
    ];
  
    const sortedPlaces = combinedPlaces.sort((a, b) => b.rating - a.rating || b.userRatingCount - a.userRatingCount);
  
    const selectTopTwo = (type: string): Place[] => {
      return sortedPlaces.filter(place => place.type === type).slice(0, 2);
    };

    const selectedPlaces = [
      ...selectTopTwo('stays'),
      ...selectTopTwo('attractions'),
      ...(this.wantCarRental ? selectTopTwo('carRentals') : []),
      ...selectTopTwo('airportTaxis'),
    ];
  
    return {
      places: selectedPlaces,
      country: this.country,
    };
  }
}
