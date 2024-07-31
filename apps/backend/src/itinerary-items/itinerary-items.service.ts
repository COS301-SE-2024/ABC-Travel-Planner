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

  async getItemsbyId(id: number): Promise<any[]> {
    //Make database call to get user id
    // ...
    const user_id = "User1"

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

  async deleteItineraryItem(userName: string, id: string) {        
        const user_name = 'User1';
        
        //Logic to delete the item from the db
        try {
            const documentRef = this.db.collection('Itinerary-items')
                                .doc(user_name)
                                .collection('Items')
                                .doc(id)

            const doc = await documentRef.get()
            if (!doc.exists) {
                throw new Error('Could not locate record - Deletion unsuccessful')
            }
            
            await documentRef.delete();
        } catch (error) {
            console.error('Could not delete record: ', error.message)
            return error.message
        }
    }
}
