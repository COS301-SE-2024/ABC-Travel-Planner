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

    @Post(':id')
    async deleteItineraryItem(userName: string, @Param(':id') id: string): Promise<any> {
        try {
            return await this.itineraryItemsService.deleteItineraryItem(userName, id);
            
        } catch (error) {
            console.error(error)
            return new Promise<any>((resolve, reject) => {
                reject('Could not delete item');
            });
        }
    }
}