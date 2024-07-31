import { Controller, Get, Post, Body, InternalServerErrorException, BadRequestException, Param } from '@nestjs/common';
import { ItineraryItemsService } from './itinerary-items.service';

@Controller('itinerary-items')
export class ItineraryItemsController {
    constructor(private readonly itineraryItemsService: ItineraryItemsService) {}

    @Post()
    async addItem(@Body() body: { user_id: string, image: string, itinerary_id: string, location: string, name: string}): Promise<void> {
        //Get User Id by database call...
        // ...

        try {
            if (body.image && body.itinerary_id && body.location && body.name) {
                await this.itineraryItemsService.addItem(body.image, body.itinerary_id, body.location, body.name, body.user_id);

            }
            else {
                throw new BadRequestException('Not all parameters are correct')
            }
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get(':id/:user')
    async getItemsById(@Param('id') id: number, @Param('user') user: string): Promise<any[]> {
        try {
            return await this.itineraryItemsService.getItemsbyId(id, user);
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('delete')
    async deleteItineraryItem(@Body() body: {user_name: string, image_url: string, itinerary_id: string, timestamp: string}): Promise<any> {
        if (!body.user_name) {
            throw new Error('User Name is not present in body')
        }

        if (!body.image_url) {
            throw new Error('Image url is not present in body')
        }

        if (!body.itinerary_id) {
            throw new Error('Itinerary ID is not present in body')
        }

        if (!body.timestamp) {
            throw new Error('Timestamp is not present in body')
        }

        try {
            return await this.itineraryItemsService.deleteItineraryItem(body.user_name, body.image_url, body.itinerary_id, body.timestamp);
            
        } catch (error) {
            console.error(error)
            return new Promise<any>((resolve, reject) => {
                reject('Could not delete item');
            });
        }
    }
}