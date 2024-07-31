import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ItineraryItemsService {
  private db: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async addItem(image_url: string, itinerary_id: string, location: string, name: string, user_id: string): Promise<void> {
    try {
      const userRef = this.db.collection('Itinerary-items').doc(user_id);
      await userRef.set({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      const subCollectionRef = userRef.collection('Items').doc();

      await subCollectionRef.set({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
              image_url: image_url,
              itinerary_id,
              location,
              name,
              user_id,
      });

    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to add item to the itinerary');
    } 
  }

  async getItemsbyId(id: number, user_id: string): Promise<any[]> {
    try {
      const data = await this.db
          .collection(`Itinerary-items`)
          .doc(user_id)
          .collection('Items')
          .where('itinerary_id', '==', id)
          .orderBy('timestamp', 'desc')
          .get();

      return data?.docs?.map(item => item.data()) ?? [];
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to fetch itinerary-items from the database');
    }
  }

  async deleteItineraryItem(user_name: string, image_url: string, itinerary_id: string, timestamp: string) : Promise<void> {        
        user_name = 'User1';
        
        try {
          //Check if it exists...
          const userItemsDir = this.db
                .collection('Itinerary-items')
                .doc(user_name)
                .collection('Items')

          const userItemsSnapshot = await userItemsDir
                .where('image_url', '==', image_url)
                .where('itinerary_id', '==', itinerary_id)
                .where('timestamp', '==', timestamp)
                .get()

        } catch (error) {
            console.error('Could not delete record: ', error.message)
            return error.message
        }
    }
}