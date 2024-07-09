import { Controller, Get, Post, Body, InternalServerErrorException, BadRequestException, Param } from '@nestjs/common';
import { ItineraryItemsService } from './itinerary-items.service';

@Controller('itinerary-items')
export class ItineraryItemsController {
    constructor(private readonly itineraryItemsService: ItineraryItemsService) {}

    @Post()
    async addItem(@Body() body: { image: string, itinerary_id: string, location: string, name: string}): Promise<void> {
        //Get User Id by database call...
        // ...

        const user_id = "User1"

        try {
            if (body.image && body.itinerary_id && body.location && body.name) {
                await this.itineraryItemsService.addItem(body.image, body.itinerary_id, body.location, body.name, user_id);

            }
            else {
                throw new BadRequestException('Not all parameters are correct')
            }
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get(':id')
    async getItemsById(@Param('id') id: number): Promise<any[]> {
        try {
            return await this.itineraryItemsService.getItemsbyId(id);
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
