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
        this.timeRenewed = new Date('1998-08-08')
        this.clientId = process.env.AMADEUS_API_KEY || '';
        this.clientSecret = process.env.AMADEUS_CLIENT_SECRET || '';
    }

    async getAccessToken() : Promise<string> {
        if (new Date().getTime() - this.timeRenewed.getTime() > 1799) {
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
                console.log(renewReq)
                const data: Amadeus_Auth_Res = renewReq.data
                console.log(data)
                this.accessToken = data.access_token
                this.timeRenewed = new Date();
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log("NOT EXPIRED!")
        }

        return this.accessToken;
    }
}