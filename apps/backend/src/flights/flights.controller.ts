import { Controller, Get, Query } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsDto } from './dto/flights.dto';

@Controller('flights')
export class FlightsController {
    constructor(private readonly flightService: FlightsService) {}

    // 1) - Get available flights
    @Get('offers')
    async getOffers(@Query() query: FlightsDto): Promise<any> {
        console.log("QUERY RECEIVED: " + JSON.stringify(query))
        const data = await this.flightService.searchFlights(query);
        return data
    }

    // 2) - Confirm real world price of flight
    // @Get('price')
    // getPrices(): object {
    //     return this.flightService.searchPrices();
    // }

    // 3) - Create the booking
    // @Get('orders')
    // createBooking() : object{
    //     return this.flightService.createBooking();
    // }

    @Get()
    returnHello(): string {
        return this.flightService.flightEndpoint();
    }
}