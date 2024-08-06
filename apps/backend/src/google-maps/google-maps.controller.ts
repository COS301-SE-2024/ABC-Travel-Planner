import { Controller, Get } from '@nestjs/common';
import { GoogleMapsService } from './google-maps.service';

@Controller('google-maps')
export class GoogleMapsController {
  constructor(private readonly googleMapsService: GoogleMapsService) {}

  @Get('popular-destinations')
  async getPopularDestinations(): Promise<any> {
    try {
      const destinations = await this.googleMapsService.fetchPopularDestinations();
      return destinations;
    } catch (error) {
      console.error('Error fetching popular destinations:', error);
      throw error;
    }
  }
}
