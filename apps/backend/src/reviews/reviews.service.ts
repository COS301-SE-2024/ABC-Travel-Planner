import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ReviewsService {
  private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async addReview(user_name: string, email: string, review_title: string, review_text: string, rating: number, destination_id: number,): Promise<void> {
    //Get User information by passing email/username; Make a database call
    // ...
    
    const user_id = '';
    const user_surname = '';
   
    try {
      await this.db.collection('Reviews').add({
        user_name,
        destination_id,
        review_title,
        review_text,
        user_id,
        user_surname,
        rating,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Could not add review to the database, check server logs');
    }
  }

  async getReviewById(destination_id: number): Promise<any[]> {
//async getReview(destination_id: number): Promise<admin.firestore.QuerySnapshot> {
    //Database call to get destination_id if not passed through...
    // ...
    try {
      const data = await this.db.collection('Reviews')
                                .where('destination_id', '==', destination_id)
                                .orderBy('timestamp', 'desc')
                                .get();
      return data?.docs?.map(review => review.data()) ?? [];
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Could not fetch reviews, check server logs');
    }
  }
}
