import { Inject, Injectable } from '@nestjs/common';
//const { PlacesClient } = require('@googlemaps/places').v1;
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { PlacesClient } from '@googlemaps/places';
interface Place {
    formattedAddress: string;
    displayName: string;
    editorialSummary: string;
    userRatingCount: number;
    plusCode: any;
    id: string;
    rating: number;
    accessibilityOptions: any; 
    paymentOptions: any; 
    goodForChildren: boolean;
    firstPhotoUrl: string;
    type: string;
}

interface DetailedPlace {
    formattedAddress: string;
    displayName: string;
    editorialSummary: string;
    userRatingCount: number;
    plusCode: any;
    id: string;
    rating: number;
    accessibilityOptions: any; 
    paymentOptions: any; 
    goodForChildren: boolean;
    photos: any[];
    reviews: any[];
    locationDetails: any;
    internationalPhoneNumber: string;
    nationalPhoneNumber: string;
    websiteUri: string;
}
  
  interface Profile {
    name: string;
    username: string;
    id: string;
    imageUrl: string;
  }

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

    async searchPlaces(textQuery: string, type: string): Promise<Place[]> {
        let includeType: string = '';
        switch (type) {
            case 'stays':
                includeType = 'lodging';
                break;
            case 'carRentals':
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

            if (!response[0] || !response[0].places || response[0].places.length === 0) {
                return [];
            }

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
                        type: type
                    } as Place;
                }

            }));
            return detailedPlaces;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDetailedPlace(id: string): Promise<DetailedPlace>{
        try {
                    let name = `places/${id}`;
                    const request = {
                        name,
                    };
                
                    const detailedPlace = await this.placesClient.getPlace(request, {
                        otherArgs: {
                            headers: {
                                'X-Goog-FieldMask': '*'
                            },
                        },
                    });
                    let apiKey: string = this.configService.get<string>('NEST_PUBLIC_GOOGLE_API_KEY')!;
                    let photoArr = [];
                    if(detailedPlace[0].photos && detailedPlace[0].photos.length > 0){
                        for (let index = 0; index < detailedPlace[0].photos.length; index++) {
                            let photo = this.constructImageUrl(detailedPlace[0].photos[index].name, apiKey as string);
                            photoArr.push(photo);
                        }
                    }

                    return {
                        id: detailedPlace[0].id,
                        reviews: detailedPlace[0].reviews,
                        locationDetails: detailedPlace[0].location,
                        internationalPhoneNumber: detailedPlace[0].internationalPhoneNumber,
                        nationalPhoneNumber: detailedPlace[0].nationalPhoneNumber,
                        websiteUri: detailedPlace[0].websiteUri,
                        formattedAddress: detailedPlace[0].formattedAddress,
                        displayName: detailedPlace[0].displayName ? detailedPlace[0].displayName.text : '',
                        editorialSummary: detailedPlace[0].editorialSummary ? detailedPlace[0].editorialSummary.text : '',
                        userRatingCount: detailedPlace[0].userRatingCount,
                        plusCode: detailedPlace[0].plusCode,
                        rating: detailedPlace[0].rating,
                        accessibilityOptions: detailedPlace[0].accessibilityOptions,
                        paymentOptions: detailedPlace[0].paymentOptions,
                        goodForChildren: detailedPlace[0].goodForChildren,
                        photos: photoArr
                    } as DetailedPlace;
        
        } catch (error) {
            console.error(error);
            return {} as DetailedPlace;
        }
    }

    async searchProfile(user: string): Promise<Profile[]> {
        const nameQuery = this.db.collection('Users')
            .where('name', '>=', user)
            .where('name', '<=', user + '\uf8ff')
            .orderBy('name')
            .startAt(user)
            .endAt(user + '\uf8ff');
        
        const usernameQuery = this.db.collection('Users')
            .where('username', '>=', user)
            .where('username', '<=', user + '\uf8ff')
            .orderBy('username')
            .startAt(user)
            .endAt(user + '\uf8ff');
    
        const [nameResults, usernameResults] = await Promise.all([nameQuery.get(), usernameQuery.get()]);
    
        const users: Profile[] = [];
        const seen = new Set();
    
        nameResults.forEach(doc => {
            if (!seen.has(doc.id)) {
                users.push({
                    name: doc.data().name,
                    username: doc.data().username,
                    id: doc.data().user_id,
                    imageUrl: doc.data().imageUrl
                } as Profile);
                seen.add(doc.id);
            }
        });
    
        usernameResults.forEach(doc => {
            if (!seen.has(doc.id)) {
                users.push({
                    name: doc.data().name,
                    username: doc.data().username,
                    id: doc.data().user_id,
                    imageUrl: doc.data().imageUrl
                } as Profile);
                seen.add(doc.id);
            }
        });
    
        return users;
    }
    
}
