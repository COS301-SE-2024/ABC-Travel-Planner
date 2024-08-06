import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { SearchService } from 'src/search/search.service';

interface Place {
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
}

@Injectable()
export class ItineraryCreatorService {

  constructor(private readonly searchService: SearchService){

  }

  async generateItineraryStrings(
    country: string,
    reason: string,
    interests: string,
  ): Promise<{ stays: string; attractions: string; carRentals: string; airportTaxis: string }> {
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
        `Must-see attractions in ${country} centered on ${interests}`,
        `Top tourist spotsin ${country} centered on ${interests}`,
        `Hidden gems in ${country} focusing on ${interests}`,
        `Popular ${interests} attractions in ${country}`,
        `${interests} activities in ${country}`,
        `Family-friendly ${interests} attractions in ${country}`,
        `Top ${interests} destinations in ${country}`
      ],
      carRentals: [
        `Best car rental services for ${reason} in ${country} catering to ${interests}`,
        `Affordable car rentals for ${reason} in ${country} with ${interests}`,
        `Luxury car rentals for ${reason} in ${country} focusing on ${interests}`,
        `Family-friendly car rentals for ${reason} in ${country} with ${interests}`,
        `Car rental deals for ${reason} in ${country} considering ${interests}`,
        `Eco-friendly car rentals for ${reason} in ${country} with ${interests}`,
        `Reliable car rental agencies for ${reason} in ${country} for ${interests}`,
        `Convenient car rentals for ${reason} in ${country} with ${interests}`,
        `Best-rated car rentals for ${reason} in ${country} focused on ${interests}`,
        `Long-term car rentals for ${reason} in ${country} with ${interests}`
      ],
      airportTaxis: [
        `Reliable airport taxis for ${reason} in ${country} considering ${interests}`,
        `Affordable airport taxis for ${reason} in ${country} with ${interests}`,
        `Luxury airport taxi services for ${reason} in ${country} focusing on ${interests}`,
        `Family-friendly airport taxis for ${reason} in ${country} with ${interests}`,
        `Eco-friendly airport taxis for ${reason} in ${country} with ${interests}`,
        `Best-rated airport taxis for ${reason} in ${country} centered on ${interests}`,
        `Airport taxi deals for ${reason} in ${country} considering ${interests}`,
        `24/7 airport taxis for ${reason} in ${country} with ${interests}`,
        `Airport taxis with great amenities for ${reason} in ${country} focusing on ${interests}`,
        `Convenient airport taxis for ${reason} in ${country} with ${interests}`
      ]
    };

    // Helper function to get a random item from an array
    const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    return {
      stays: getRandomItem(searchStrings.stays),
      attractions: getRandomItem(searchStrings.attractions),
      carRentals: getRandomItem(searchStrings.carRentals),
      airportTaxis: getRandomItem(searchStrings.airportTaxis),
    };
  }

  async getPlacesFromGoogleMaps(searchStrings: { stays: string; attractions: string; carRentals: string; airportTaxis: string }): Promise<{ stays: any[]; attractions: any[]; carRentals: any[]; airportTaxis: any[] }> {
    const categories: (keyof typeof searchStrings)[] = ['stays', 'attractions', 'carRentals', 'airportTaxis'];
    const places = {
      stays: [] as Place[],
      attractions: []as Place[],
      carRentals: [] as Place[],
      airportTaxis: [] as Place[],
      staysString: searchStrings['stays'],
      attractionString: searchStrings['attractions'],
      carRentalsString: searchStrings['carRentals'],
      airportTaxiString: searchStrings['airportTaxis']

    };

    const promises = categories.map(async (category) => {
      const searchString = searchStrings[category];
      const response = await this.searchService.searchPlaces(searchString, category);
      places[category] = response;
    });

    await Promise.all(promises);

    return places;
  }

  
}
