import { Inject, Injectable } from '@nestjs/common';
const { PlacesClient } = require('@googlemaps/places').v1;
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class SearchService {
    private placesClient: any;
    private defaultImageUrl = 'https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg';
    private db: admin.firestore.Firestore;
    private filter: admin.firestore.Filter;

    constructor(private configService: ConfigService, @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
        this.placesClient = new PlacesClient();
        this.db = firebaseApp.firestore();
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
                includeType = 'travel_agency';
                break;
            case 'attractions':
                includeType = '';
                break;
            case 'flights':
                includeType = 'airport';
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
                
                    const detailedPlace = await this.placesClient.getPlace(request, {
                        otherArgs: {
                            headers: {
                                'X-Goog-FieldMask': 'accessibilityOptions,id,displayName,formattedAddress,paymentOptions,plusCode,priceLevel,rating,types,userRatingCount,editorialSummary,photos,goodForChildren'
                            },
                        },
                    });
                    console.log(JSON.stringify(detailedPlace[0].types));
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
        //admin.firestore.Filter.where('user_name', '>=', user), admin.firestore.Filter.where('user_name', '<=', user + '\uf8ff')
        const data = await this.db.collection('Users').where(admin.firestore.Filter.or(admin.firestore.Filter.where('name', '>=', user), admin.firestore.Filter.where('name', '<=', user + '\uf8ff'))).get();
        if (data.empty) {
            return [];
        }

        const users: any[] = [];
        data.forEach(doc => {
            users.push({
                name: doc.data().name,
                //username: doc.data().username,
                id: doc.data().user_id,
                imageUrl: doc.data().image_url
            });
        });

        return users;
    }
}