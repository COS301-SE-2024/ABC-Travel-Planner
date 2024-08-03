import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class LikeService {
    private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }
  //We need a liked by field...
  async isLiked(post_id: string, user_id: string) : Promise<boolean> {
    const isLikedRes = await this.db
                              .collection('Likes')
                              .where('post_id', '==', post_id)
                              .where('liked_by', '==', user_id)
                              .get()

    console.log(isLikedRes)
    console.log("Data: " + isLikedRes.docs[0].data())
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
      try {
        const delRes = await unlikeQuery.docs[0].ref.delete()
      } catch (error) {
        console.log(error)
        throw new Error('Could not delete like - Check server')
      }

      const post = await this.db
                    .collection('Posts')
                    .doc(id)
                    .get()

      if (post.exists) {
        const postLikes = post.get('post_likes')
        try {
          await this.db
                .collection('Posts')
                .doc(id)
                .update({
                  'post_likes' : (postLikes - 1)
                });
        } catch (error) {
          console.log(error)
          throw new Error(`Could not update like count in Posts: ${(error as Error).message}`)
        }
        
      } else {
        throw new Error("Post does not exist - could not unlike")
      }
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
      const post = await this.db
                        .collection('Posts')
                        .doc(id)
                        .get();

      const postLikes = post.get('post_likes')
        try {
          await this.db
                .collection('Posts')
                .doc(id)
                .update({
                  'post_likes' : (postLikes + 1)
                });
        } catch (error) {
          console.log(error)
          throw new Error(`Could not update like count in Posts: ${(error as Error).message}`)
        }
      return true;
    } else {
      throw new Error("Post does not exist - could not like")
    }
  }
}
