import { Inject, Injectable } from '@nestjs/common';
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
  }

  async getReviewById(destination_id: number): Promise<any[]> {
//async getReview(destination_id: number): Promise<admin.firestore.QuerySnapshot> {
    //Database call to get destination_id if not passed through...
    // ...

    const data = await this.db.collection('Reviews').where('destination_id', '==', destination_id).orderBy('timestamp', 'desc').get();
    
    if (!data) {
      console.log("REVIEWS DATA RETURNED NULL")
      return []
    }

    const reviews: any[] | PromiseLike<any[]> = [];
    data.forEach(element => {
      reviews.push(element.data())
    });

    return reviews;
  }
}
