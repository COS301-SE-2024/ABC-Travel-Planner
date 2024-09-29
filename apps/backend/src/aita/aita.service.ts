import { Injectable } from '@nestjs/common';
import { Amadeus_Auth } from 'src/utils/amadeus_auth';
import axios from 'axios'

@Injectable()
export class AitaService {
    private amadeus: Amadeus_Auth;

    constructor() {
        this.amadeus = new Amadeus_Auth();
    }

  async getAccessToken(): Promise<string> {
    return this.amadeus.getAccessToken();
  }

  async getAITAcodes(searchTerm: string, country_code: string): Promise<string> {
    country_code = 'ZA';
    const access_token = await this.getAccessToken();
    console.log("ACCESS: " + access_token)
    try {
        const res = await axios.get(
            `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchTerm}&countryCode=${country_code}&page[limit]=10&page[offset]=0&sort=analytics.travelers.score&view=LIGHT`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log(res)
        const resData = res.data
        console.log(resData)
        return resData;
        
    } catch (error) {
        console.error(error)
        return ''
    }
  }
}
