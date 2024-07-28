import { Body, Controller, Post } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

@Controller('itinerary')
export class ItineraryController {
    constructor(private itineraryService: ItineraryService) {}

    @Post('getItineraries')
    async getItineraries(@Body() body: {user_id: string}) {
        return this.itineraryService.getItineraries(body.user_id);
    }

    @Post('create')
    async createItinerary(@Body() body: {name: string, location: string,user_id: string}) { 
        try {
            return this.itineraryService.createItinerary(body.name,body.location,body.user_id);
        }
        catch (error) {
            throw error;
        }
        
    }

    @Post('getItinerary')
    async getItinerary(@Body() body: {itineraryId: string}) {
        return this.itineraryService.getItinerary(body.itineraryId);
    }

    @Post('update')
    async updateItinerary(@Body() body: {itineraryId: string, name: string, location: string}) {
        return this.itineraryService.updateItinerary(body.itineraryId, body.name, body.location);
    }

    @Post('delete')
    async deleteItinerary(@Body() body: {itineraryId: string}) {
        return this.itineraryService.deleteItinerary(body.itineraryId);
    }
}
