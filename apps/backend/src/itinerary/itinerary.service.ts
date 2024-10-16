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
        dateCreated: new Date(),
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
      .orderBy('dateCreated', 'desc')
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
      .orderBy('dateCreated', 'desc')
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

  async likeItinerary(itineraryId: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .update({ likes: admin.firestore.FieldValue.increment(1) });

    await this.firebaseApp.firestore().collection('likedItineraries').add({
      itinerary_id: itineraryId,
      user_id,
      timestamp: new Date(),
    });

    return result;
  }

  async unlikeItinerary(itineraryId: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .update({ likes: admin.firestore.FieldValue.increment(-1) });

    const result2 = await this.firebaseApp
      .firestore()
      .collection('likedItineraries')
      .where('itinerary_id', '==', itineraryId)
      .where('user_id', '==', user_id)
      .get();

    const doc = result2.docs[0];
    await this.firebaseApp
      .firestore()
      .collection('likedItineraries')
      .doc(doc.id)
      .delete();
    return result;
  }

  async userLikesItinerary(itineraryId: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('likedItineraries')
      .where('itinerary_id', '==', itineraryId)
      .where('user_id', '==', user_id)
      .get();
    return result.docs.length > 0;
  }

  async saveItinerary(itineraryId: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Saved-Itineraries')
      .add({
        itinerary_id: itineraryId,
        user_id,
        timestamp: new Date(),
      });
    return result.id;
  }

  async unsaveItinerary(itineraryId: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Saved-Itineraries')
      .where('itinerary_id', '==', itineraryId)
      .where('user_id', '==', user_id)
      .get();
    const doc = result.docs[0];
    await this.firebaseApp
      .firestore()
      .collection('Saved-Itineraries')
      .doc(doc.id)
      .delete();
    return doc.id;
  }

  async userSavedItinerary(itineraryId: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Saved-Itineraries')
      .where('itinerary_id', '==', itineraryId)
      .where('user_id', '==', user_id)
      .get();
    return result.docs.length > 0;
  }

  async getSavedItineraries(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Saved-Itineraries')
      .where('user_id', '==', user_id)
      .get();

    const arr = await Promise.all(
      result.docs.map(async (doc) => {
        const fetchData = async () => {
          const temp = await this.firebaseApp
            .firestore()
            .collection('Itineraries')
            .doc(doc.data().itinerary_id)
            .get();
          return temp.data();
        };

        return fetchData();
      }),
    );
    return arr;
  }

  async changeFavouriteCountries(user_id: string, countries: string[]) {
    const filteredCountries = countries.filter(
      (country) => country !== undefined,
    );
    const result = await this.firebaseApp
      .firestore()
      .collection('Favourite-Countries')
      .doc(user_id)
      .set({ favouriteCountries: filteredCountries });
    return result;
  }

  async getItineraryOwner(itineraryId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Itineraries')
      .doc(itineraryId)
      .get();
    return result?.data()?.user_id;
  }
}
