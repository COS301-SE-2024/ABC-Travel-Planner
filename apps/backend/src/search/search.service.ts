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

    constructImageUrl(photoName: string, apiKey: string, maxHeight = 429, maxWidth = 612){
        return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=${maxHeight}&maxWidthPx=${maxWidth}&key=${apiKey}`;
    }

    async searchPlaces(textQuery: string): Promise<any> {
        const request = {
            textQuery: textQuery,
            includedType: 'lodging'
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
                    console.log(place.id);
                    let name = `places/${place.id}`;
                    const request = {
                        name,
                    };

                    // Run request
                    const detailedPlace = await this.placesClient.getPlace(request, {
                        otherArgs: {
                            headers: {
                                'X-Goog-FieldMask': '*',
                            },
                        },
                    });
                    // console.log(detailedPlace[0].photos);
                    let apiKey: string = this.configService.get<string>('NEST_PUBLIC_GOOGLE_API_KEY')!;
                    const firstPhotoUrl = detailedPlace[0].photos && detailedPlace[0].photos.length > 0 ?
                        this.constructImageUrl(detailedPlace[0].photos[0].name, apiKey as string) :
                        this.defaultImageUrl;
                    console.log('First Photo URL:', firstPhotoUrl);

                    return {
                        ...detailedPlace,
                        firstPhotoUrl: firstPhotoUrl,
                        type: "stays"
                    };
                }

            }));
            return detailedPlaces;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to search places');
        }
    }
}
