import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ItineraryService {
    constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App){}
    async createItinerary(itinerary: any) {
        const result = await this.firebaseApp.firestore().collection('Itineraries').add(itinerary);
        return result;
    }

    async getItineraries() {
        const result = await this.firebaseApp.firestore().collection('Itineraries').get();
        return result.docs.map(doc => doc.data());
    }

    async getItinerary(itineraryId: string) {
        const result = await this.firebaseApp.firestore().collection('Itineraries').doc(itineraryId).get();
        return result.data();
    }

    async updateItinerary(itineraryId: string, itinerary: any) {
        const result = await this.firebaseApp.firestore().collection('Itineraries').doc(itineraryId).update(itinerary);
        return result;
    }

    async deleteItinerary(itineraryId: string) {
        const result = await this.firebaseApp.firestore().collection('Itineraries').doc(itineraryId).delete();
        return result;
    }
}
