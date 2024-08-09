import { Controller, Get, Post, Body, InternalServerErrorException, BadRequestException, Param, Res, HttpStatus } from '@nestjs/common';
import { ItineraryItemsService } from './itinerary-items.service';
import { Response } from 'express'

@Controller('itinerary-items')
export class ItineraryItemsController {
    constructor(private readonly itineraryItemsService: ItineraryItemsService) {}

    @Post('add')
    async addItem(@Body() body: { 
            user_id: string, 
            item_name: string, 
            item_type: string, 
            location: string, 
            itinerary_id: string, 
            destination: string, 
            image_url: string
        },
        @Res() res: Response): Promise<void> {
        try {
            if (body.user_id && body.item_name && body.item_type && body.location && body.itinerary_id && body.destination && body.image_url ) {
                const result = await this.itineraryItemsService.addItem(body.user_id, body.item_name, body.item_type, body.location, body.itinerary_id, body.destination, body.image_url);
                res.status(HttpStatus.CREATED).json(result);
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).json({message: 'Not all parameters are correctly formatted or some are missing'});
                // throw new BadRequestException('Not all parameters are correctly formatted or some are missing')
            }
        } 
        catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    }

    @Get(':id/:user')
    async getItemsById(@Param('id') id: number, @Param('user') user: string): Promise<any[]> {
        try {
            console.log("REACHED BACKEND!!!");
            return await this.itineraryItemsService.getItemsbyId(id, user);
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('delete')
    async deleteItineraryItem(@Body() body: {user_name: string, image_url: string, itinerary_id: string, timestamp: {_seconds: number, _nanoseconds: number}}): Promise<any> {
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