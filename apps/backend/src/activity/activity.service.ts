import { Injectable, Inject } from '@nestjs/common';

import * as admin from 'firebase-admin';

@Injectable()
export class ActivityService {
  

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
   
  }

  async countLikesByUser(userId: string) {
    const likesCollection = this.firebaseApp.firestore().collection('Likes');
    const snapshot = await likesCollection.where('user_id', '==', userId).get();
    return snapshot.size;
  }

  async countCommentsByUser(userId: string) {
    const commentsCollection = this.firebaseApp.firestore().collection('Comments');
    const snapshot = await commentsCollection.where('user_id', '==', userId).get();
    return snapshot.size;
  }

  async countPostsByUser(userId: string) {
    const commentsCollection = this.firebaseApp.firestore().collection('Posts');
    const snapshot = await commentsCollection.where('user_id', '==', userId).get();
    return snapshot.size;
  }
}
