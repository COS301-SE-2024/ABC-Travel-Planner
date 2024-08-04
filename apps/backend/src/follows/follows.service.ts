import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FollowsService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async followUser(user_id: string, follower_id: string) {
    const r = await this.firebaseApp
      .firestore()
      .collection('Follow-Details')
      .where('user_id', '==', user_id)
      .where('follower_id', '==', follower_id)
      .get();

    if (r.docs.length === 0) {
      const result = await this.firebaseApp
        .firestore()
        .collection('Follow-Details')
        .add({
          user_id,
          follower_id,
          timestamp: new Date(),
        });
      await this.firebaseApp
        .firestore()
        .collection('Follow-Details')
        .doc(result.id)
        .update({ id: result.id });
      return result.id;
    } else {
      const result = await this.firebaseApp
        .firestore()
        .collection('Follow-Details')
        .where('user_id', '==', user_id)
        .where('follower_id', '==', follower_id)
        .get();
      result.docs.map((doc) => doc.ref.delete());
    }
  }

  async getFollowers(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Follow-Details')
      .where('user_id', '==', user_id)
      .get();
    const temp = await Promise.all(
      result.docs.map(async (doc) => {
        const fetchUsers = async () => {
          const users = await this.firebaseApp
            .firestore()
            .collection('Users')
            .doc(doc.data().follower_id)
            .get();

          return users.data();
        };

        return fetchUsers();
      }),
    );

    return temp;
  }

  async getFollowing(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Follow-Details')
      .where('follower_id', '==', user_id)
      .get();

    const temp = await Promise.all(
      result.docs.map(async (doc) => {
        const fetchUsers = async () => {
          const users = await this.firebaseApp
            .firestore()
            .collection('Users')
            .doc(doc.data().user_id)
            .get();

          return users.data();
        };

        return fetchUsers();
      }),
    );

    return temp;
  }

  async isFollowing(user_id: string, follower_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Follow-Details')
      .where('user_id', '==', user_id)
      .where('follower_id', '==', follower_id)
      .get();
    return result.docs.length > 0;
  }
}
