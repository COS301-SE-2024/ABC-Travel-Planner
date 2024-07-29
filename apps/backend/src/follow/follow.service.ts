import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'

@Injectable()
export class FollowService {
  private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async getFollowers(userName: string) : Promise<any[]> {
    // Username is passed down or a db call is made...
    // ...
    userName = 'User1';

    try {
          const followers = await this.db
              .collection('Follow-Details')
              .doc(userName)
              .collection('Followers')
              .get()

        return followers?.docs?.map(follower => follower.data()) ?? [];
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
  }

  async getFollowing(userName: string) : Promise<any[]> {
    // Username is passed down or a db call is made...
    // ...
    userName = 'User1';

    try {
          const following = await this.db
              .collection('Follow-Details')
              .doc(userName)
              .collection('Followers')
              .get()

        return following?.docs?.map(follower => follower.data()) ?? [];
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
  }

  async follow(currUser : string, userToFollow: string) : Promise<void> {
    // Username is passed down or a db call is made...
    // ...
    currUser = 'User1';

    try {

      //
      const followResponse = await this.db
            .collection('Follow-Details')
            .doc(currUser)
            .collection('Following')
            .add({
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            })
      
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async unfollow(currUser : string, userToUnfollow : string) : Promise<void> {
    // Username is passed down or a db call is made...
    // ...
    currUser = 'User1'; 


  }
}
