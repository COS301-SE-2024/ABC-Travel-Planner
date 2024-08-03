import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ItineraryService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}
  async createItinerary(
    name: string,
    location: string,
    user_id: string,
    imageUrl: string,
  ) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .add({
        name,
        location,
        user_id,
        shared: false,
        dateCreated: new Date().toISOString().substring(0, 10),
        imageUrl,
        likes: 0,
      });
    await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(result.id)
      .update({ id: result.id });
    return result.id;
  }

  async getItineraries(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .where('user_id', '==', user_id)
      .get();
    return result.docs.map((doc) => doc.data());
  }

  async getItinerary(itineraryId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .get();
    return result.data();
  }

  async updateItinerary(
    itineraryId: string,
    name: string,
    location: string,
    imageUrl: string,
  ) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .update({ name, location, imageUrl });
    return result;
  }

  async deleteItinerary(itineraryId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .delete();
    return result;
  }
  async shareItinerary(itineraryId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .update({ shared: true });
    return result;
  }

  async getMySharedItineraries(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .where('shared', '==', true)
      .where('user_id', '==', user_id)
      .get();
    return result.docs.map((doc) => doc.data());
  }

  async addItineraryItem(
    itinerary_id: string,
    item_name: string,
    item_type: string,
    location: string,
    imageUrl: string,
    destination: string,
  ) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itinerary-items')
      .add({
        itinerary_id,
        item_name,
        item_type,
        location,
        imageUrl,
        destination,
      });
    await this.firebaseApp
      .firestore()
      .collection('Itinerary-items')
      .doc(result.id)
      .update({ id: result.id });
    return result.id;
  }

  async getItineraryItems(itinerary_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itinerary-items')
      .where('itinerary_id', '==', itinerary_id)
      .get();
    return result.docs.map((doc) => doc.data());
  }

  async likeItinerary(itineraryId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .update({ likes: admin.firestore.FieldValue.increment(1) });
    return result;
  }

  async unlikeItinerary(itineraryId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .update({ likes: admin.firestore.FieldValue.increment(-1) });
    return result;
  }
}
