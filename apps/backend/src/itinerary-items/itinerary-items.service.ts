import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ItineraryItemsService {
  private db: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async addItem(user_id: string, item_name: string, item_type: string, location: string, itinerary_id: string, destination: string, image_url: string): Promise<void> {
    try {

      const exists = await this.db
        .collection('Itinerary-items')
        .doc(user_id)
        .collection('Items')
        .where('user_id', '==', user_id)
        .where('item_name', '==', item_name)
        .where('item_type', '==', item_type)
        .where('location', '==', location)
        .where('itinerary_id', '==', itinerary_id)
        .where('destination', '==', destination)
        .where('image_url', '==', image_url)
        .limit(1)
        .get()

        console.log(exists)
        console.log(JSON.stringify(exists))

        if (exists.empty) {
          const userRef = this.db.collection('Itinerary-items').doc(user_id);
          await userRef.set({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
    
          const subCollectionRef = userRef.collection('Items').doc();
    
          await subCollectionRef.set({
                  itinerary_id,
                  item_name,
                  item_type,
                  location,
                  image_url,
                  destination,
                  user_id,
                  timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
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

  async deleteItineraryItem(user_name: string, image_url: string, itinerary_id: string, timestamp: {_seconds: number, _nanoseconds: number}) : Promise<void> {        
        console.log("Received timestamp: " + JSON.stringify(timestamp))
        try {
          //Check if it exists...
          const userItemsDir = this.db
                .collection('Itinerary-items')
                .doc(user_name)
                .collection('Items')

          const userItemsSnapshot = await userItemsDir
              .where('image_url', '==', image_url)
              .where('itinerary_id', '==', itinerary_id)
              .where('timestamp', '==', admin.firestore.Timestamp.fromMillis(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000))
              .limit(1)
              .get()

          if (userItemsSnapshot.empty) {
            console.log("Could not delete... No matching docs found")
            throw new Error('Could not delete item - not found')
          }

          //Deleting item...
          userItemsSnapshot.forEach((item) => {
            item.ref.delete();
            console.log("Document deleted successfully")
          })

        } catch (error) {
            console.error('Could not delete document: ', error.message)
            return error.message
        }
    }
}