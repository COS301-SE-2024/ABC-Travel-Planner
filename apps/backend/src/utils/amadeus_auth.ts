import axios from 'axios'
import qs from 'qs'

interface Amadeus_Auth_Res {
    type: string,
    username: string,
    application_name: string,
    client_id: string,
    token_type: string,
    access_token: string,
    expires_in: number,
    state: string,
    scope: string
}

export class Amadeus_Auth {
    private clientId: string
    private clientSecret: string
    private accessToken: string
    private timeRenewed: Date

    constructor() {
        this.timeRenewed = new Date('2024-06-06')
        this.clientId = process.env.AMADEUS_API_KEY || '';
        this.clientSecret = process.env.AMADEUS_CLIENT_SECRET || '';
    }

    async getAccessToken() : Promise<string> {
        const currentTime = new Date();
        console.log("CURRENT TIME: " + currentTime.getTime() / 1000)
        console.log("TIME RENEWED: " + this.timeRenewed.getTime() / 1000)

        if (currentTime.getTime()/1000 - this.timeRenewed.getTime()/1000 > 1795) {
            console.log("EXPIRED!!")
            
            const body = {
                'grant_type': 'client_credentials',
                'client_id': this.clientId,
                'client_secret': this.clientSecret
            };

            //Getting ready for x-www-form-urlencoded request
            const reqOptions = {
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: new URLSearchParams(body).toString(),
                url: `https://test.api.amadeus.com/v1/security/oauth2/token`
            };
            
            try {
                const renewReq = await axios(reqOptions)
                const data: Amadeus_Auth_Res = renewReq.data
                this.accessToken = data.access_token
                this.timeRenewed = currentTime;
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log("NOT EXPIRED!")
        }

        return this.accessToken;
    }
}