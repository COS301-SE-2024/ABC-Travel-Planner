import { Injectable } from '@nestjs/common';
import { FlightsDto } from './dto/flights.dto';
import { ResponseDto } from './dto/response.dto';

const amadeus = require('amadeus');

@Injectable()
export class FlightsService {
  private amadeus: any;

  constructor() {
    //Initialize the Amadeus api
    this.amadeus = new amadeus({
      clientId: process.env.AMADEUS_API_KEY || 'No client api key',
      clientSecret: process.env.AMADEUS_CLIENT_SECRET || 'No client secret',
    });
  }

  async searchFlights(query: FlightsDto) : Promise<any[]> {
    try {
        const response = await this.amadeus.shopping.flightOffersSearch.get({
           ...query
        })

        console.log(`This was the reponse from the Amadeus API:\n${JSON.stringify(response)}`)
        const results = response?.result;
        const count = results?.meta?.count;
        const flightData: any = results?.data;

        const responseData: ResponseDto = {
          count: count,
          data: flightData.map((item:any) => {
            const flightItem = {
              ...item
            }

            return flightItem;
          })
        };

        return response?.result;
    } catch(error) {
        console.error(error);
        return ['Error - Check server console']
    }
}

    // searchPrices() : Promise<any[]> {
    //     try {
    //         const response = await this.amadeus.shopping.flightOffersPrice.
    //     }
    // }

    // createBooking() : Promise<any[]> {
    //     try {
    //         const response = await this.amadeus.shopping.flightOffersPrice.
    //     }
    // }

    flightEndpoint() : string {
        return "You've reached the flight endpoint✈️"
    }
}