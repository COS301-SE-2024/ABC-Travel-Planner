import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { UserNotFoundException } from 'src/Exceptions/user-not-found-exception';

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

    //Check if user exists in db...
    const currUserExists = (await this.db.collection('Users').doc(userName).get()).exists
    
    if (!currUserExists) {
      throw new UserNotFoundException(userName)
    }

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

    //Check if user exists in db...
    const currUserExists = (await this.db.collection('Users').doc(userName).get()).exists
    
    if (!currUserExists) {
      throw new UserNotFoundException(userName)
    }

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
    userToFollow = 'User3';

    try {

      //Check if user exists in db...
      const currUserExists = (await this.db.collection('Users').doc(currUser).get()).exists
      const userToFollowExists = (await this.db.collection('Users').doc(userToFollow).get()).exists
      
      if (!currUserExists) {
        throw new UserNotFoundException(currUser)
      }

      if (!userToFollowExists) {
        throw new UserNotFoundException(currUser)
      }

      const followResponse = await this.db
            .collection('Follow-Details')
            .doc(currUser)
            .collection('Following')
            .doc(userToFollow)
            .set({
              followedUserRef: this.db.collection(userToFollow),
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

    //Check if user exists in db...
    const currUserExists = (await this.db.collection('Users').doc(currUser).get()).exists
    const userToFollowExists = (await this.db.collection('Users').doc(userToFollow).get()).exists
    
    if (!currUserExists) {
      throw new UserNotFoundException(currUser)
    }

    if (!userToFollowExists) {
      throw new UserNotFoundException(currUser)
    }
    
  }
}
