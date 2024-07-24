import { Injectable } from '@nestjs/common';
const { PlacesClient } = require('@googlemaps/places').v1;
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SearchService {
    private placesClient: any;
    private defaultImageUrl = 'https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg';
    constructor(private configService: ConfigService) {
        this.placesClient = new PlacesClient();
    }

    constructImageUrl(photoName: string, apiKey: string, maxHeight = 429, maxWidth = 612) {
        return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=${maxHeight}&maxWidthPx=${maxWidth}&key=${apiKey}`;
    }

    async searchPlaces(textQuery: string, type: string): Promise<any> {
        let includeType: string = '';
        switch (type) {
            case 'stays':
                includeType = 'lodging';
                break;
            case 'carRental':
                includeType = 'car_rental';
                break;
            case 'airportTaxis':
                includeType = '';
                break;
            case 'attractions':
                includeType = '';
                break;
            case 'flights':
                includeType = '';
                break;
            default:
                break;
        }

        const request = {
            textQuery: textQuery,
            includedType: includeType
        };

        try {
            const response = await this.placesClient.searchText(request, {
                otherArgs: {
                    headers: {
                        'X-Goog-FieldMask': 'places.id',
                    },
                },
            });

            const detailedPlaces = await Promise.all(response[0].places.map(async (place: any) => {
                if (place !== null) {
                    let name = `places/${place.id}`;
                    const request = {
                        name,
                    };
                    //'accessibilityOptions,id,displayName,formattedAddress,paymentOptions,plusCode,priceLevel,rating,types,userRatingCount,editorialSummary,photos,goodForChildren'
                    const detailedPlace = await this.placesClient.getPlace(request, {
                        otherArgs: {
                            headers: {
                                'X-Goog-FieldMask': 'accessibilityOptions,id,displayName,formattedAddress,paymentOptions,plusCode,priceLevel,rating,types,userRatingCount,editorialSummary,photos,goodForChildren'
                            },
                        },
                    });

                    let apiKey: string = this.configService.get<string>('NEST_PUBLIC_GOOGLE_API_KEY')!;
                    const firstPhotoUrl = detailedPlace[0].photos && detailedPlace[0].photos.length > 0 ?
                        this.constructImageUrl(detailedPlace[0].photos[0].name, apiKey as string) :
                        this.defaultImageUrl;

                    return {
                        formattedAddress: detailedPlace[0].formattedAddress,
                        displayName: detailedPlace[0].displayName ? detailedPlace[0].displayName.text : '',
                        editorialSummary: detailedPlace[0].editorialSummary ? detailedPlace[0].editorialSummary.text : '',
                        userRatingCount: detailedPlace[0].userRatingCount,
                        plusCode: detailedPlace[0].plusCode,
                        id: detailedPlace[0].id,
                        rating: detailedPlace[0].rating,
                        accessibilityOptions: detailedPlace[0].accessibilityOptions,
                        paymentOptions: detailedPlace[0].paymentOptions,
                        goodForChildren: detailedPlace[0].goodForChildren,
                        firstPhotoUrl: firstPhotoUrl,
                        // type: type
                    };
                }

            }));
            return detailedPlaces;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to search places');
        }
    }

    async searchProfile(user: string): Promise<any> {

    }
}
