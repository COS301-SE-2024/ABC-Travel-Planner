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
    // const currUser = this.db.collection('Users').doc(userName);
    // const currUserDoc = await currUser.get();
    // const currUserExists = currUserDoc.exists
    
    // console.log(`Fetching document: Users/${userName}`);
    // console.log(`Document snapshot: ${JSON.stringify(currUserDoc)}`);
    // console.log(`Document exists: ${currUserExists}`);

    // if (!currUserExists) {
    //   throw new NotFoundException("User", userName)
    // }

    try {
        const followersData = await this.db
              .collection('Follow-Details')
              .doc(userName)
              .collection('Followers')
              .get()
            
        const followers = followersData.docs.map( follower => ({
          userName: follower.id,
          ...follower.data()
        }))

        return followers ?? [];
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
    // const currUserExists = (await this.db.collection('Users').doc(userName).get()).exists
    
    // if (!currUserExists) {
    //   throw new NotFoundException("User", userName)
    // }

    try {
        const followingData = await this.db
              .collection('Follow-Details')
              .doc(userName)
              .collection('Following')
              .get()

        const following = followingData.docs.map( followee => ({
          userName: followee.id,
          ...followee.data()
        }))

        return following ?? [];
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
  }

  async follow(currUser : string, userToFollow: string) : Promise<void> {
    // Username is passed down or a db call is made...
    // ...
    // currUser = 'User1';
    // userToFollow = 'User2';

    try {
      //Check if user exists in db...
      // const currUserExists = (await this.db.collection('Users').doc(currUser).get()).exists
      // const userToFollowExists = (await this.db.collection('Users').doc(userToFollow).get()).exists
      
      // if (!currUserExists) {
      //   throw new NotFoundException("User", currUser)
      // }

      // if (!userToFollowExists) {
      //   throw new NotFoundException("User", userToFollow)
      // }

      const followResponse = await this.db
            .collection('Follow-Details')
            .doc(currUser)
            .collection('Following')
            .doc(userToFollow)
            .set({
              followedUserRef: this.db.collection('Users').doc(userToFollow),
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            })

      console.log(followResponse)

      const followerResponse = await this.db
            .collection('Follow-Details')
            .doc(userToFollow)
            .collection('Followers')
            .doc(currUser)
            .set({
              followedUserRef: this.db.collection('Users').doc(userToFollow),
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

    // currUser = 'User1'; 
    // userToUnfollow = 'User4';

    //Check if user exists in db...
    // const currUserExists = (await this.db.collection('Users').doc(currUser).get()).exists
    // const userToUnfollowExists = (await this.db.collection('Users').doc(userToUnfollow).get()).exists
    
    // if (!currUserExists) {
    //   throw new NotFoundException("User", currUser)
    // }

    // if (!userToUnfollowExists) {
    //   throw new NotFoundException("User", userToUnfollow)
    // }

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
