import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { NotFoundException } from 'src/Exceptions/not-found-exception';
import { FollowException } from 'src/Exceptions/follow-unsuccessful-exception';

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
      throw new NotFoundException("User", userName)
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
      throw new NotFoundException("User", userName)
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
    userToFollow = 'User2';

    try {
      //Check if user exists in db...
      const currUserExists = (await this.db.collection('Users').doc(currUser).get()).exists
      const userToFollowExists = (await this.db.collection('Users').doc(userToFollow).get()).exists
      
      if (!currUserExists) {
        throw new NotFoundException("User", currUser)
      }

      if (!userToFollowExists) {
        throw new NotFoundException("User", userToFollow)
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

      console.log(followResponse)

      const followerResponse = await this.db
            .collection('Follow-Details')
            .doc(userToFollow)
            .collection('Followers')
            .doc(currUser)
            .set({
              followedUserRef: this.db.collection(userToFollow),
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            })
  
      console.log(followerResponse)

      if (!followResponse) {
        throw new FollowException(true, "follow", currUser, userToFollow)
      }

      if (!followerResponse) {
        throw new FollowException(true, "follower", currUser, userToFollow)
      }
      
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async unfollow(currUser : string, userToUnfollow : string) : Promise<void> {
    // Username is passed down or a db call is made...
    // ...
    currUser = 'User1'; 
    userToUnfollow = 'User2';

    //Check if user exists in db...
    const currUserExists = (await this.db.collection('Users').doc(currUser).get()).exists
    const userToUnfollowExists = (await this.db.collection('Users').doc(userToUnfollow).get()).exists
    
    if (!currUserExists) {
      throw new NotFoundException("User", currUser)
    }

    if (!userToUnfollowExists) {
      throw new NotFoundException("User", userToUnfollow)
    }

    const unfollowResponse = await this.db
            .collection('Follow-Details')
            .doc(currUser)
            .collection('Following')
            .doc(userToUnfollow)
            .delete()

    console.log(unfollowResponse)

    const unfollowerResponse = await this.db
          .collection('Follow-Details')
          .doc(userToUnfollow)
          .collection('Followers')
          .doc(currUser)
          .delete()

    console.log(unfollowerResponse)

    if (!unfollowResponse) {
      throw new FollowException(false, "follow", currUser, userToUnfollow)
    }

    if (!unfollowerResponse) {
      throw new FollowException(false, "follower", currUser, userToUnfollow)
    }
  }
}
