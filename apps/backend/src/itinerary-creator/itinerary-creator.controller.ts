import { Controller, Get, Query } from '@nestjs/common';
import { ItineraryCreatorService } from './itinerary-creator.service';


@Controller('itinerary-creator')
export class ItineraryCreatorController {
  constructor(private readonly itineraryCreatorService: ItineraryCreatorService) { }

  @Get('itinerary')
  async generateItinerary(
    @Query('country') country: string,
    @Query('reason') reason: string,
    @Query('interests') interests: string,
  ) {
    const searchStrings = await this.itineraryCreatorService.generateItineraryStrings(country, reason, interests);
    const places = await this.itineraryCreatorService.getPlacesFromGoogleMaps(searchStrings);
    const bestOptions = await this.itineraryCreatorService.selectBestOptions(places);
    return bestOptions;
  }
}
