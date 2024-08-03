import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class LikeService {
    private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async isLiked(id: string) : Promise<boolean> {
    const isLikedRes = await this.db
                              .collection('Likes')
                              .where('post_id', '==', id)
                              .get()

    return isLikedRes.empty;
  }

  async unlike(id: string, user_id: string) : Promise<boolean> {
    const unlikeQuery = await this.db
                              .collection('Likes')
                              .where('post_id', '==', id)
                              .where('user_id', '==', user_id)
                              .limit(1)
                              .get();
    
    if (!unlikeQuery.empty) {
      const delRes = await unlikeQuery.docs[0].ref.delete()
    }  else {
      return false;
    }
    
    return true;
  }

  async like(id: string, user_id: string) : Promise<boolean> {
    
    const likeQuery = await this.db
                            .collection('Likes')
                            .add({
                              id: 'RandomLikeId',
                              post_id: id,
                              user_id,
                              timestamp: admin.firestore.FieldValue.serverTimestamp(),
                            })
    if (likeQuery) {
      return true;
    }

    return false;
  }
}
