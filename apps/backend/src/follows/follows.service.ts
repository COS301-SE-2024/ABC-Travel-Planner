import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FollowsService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async followUser(userId: string, followerId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Follow-Details')
      .add({
        userId,
        followerId,
        timestamp: new Date(),
      });
    await this.firebaseApp
      .firestore()
      .collection('Follows')
      .doc(result.id)
      .update({ id: result.id });
    return result.id;
  }

    async getFollowers(userId: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection('Follow-Details')
        .where('userId', '==', userId)
        .get();
        return result.docs.map((doc) => doc.data());
    }

    async getFollowing(userId: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection('Follow-Details')
        .where('followerId', '==', userId)
        .get();
        return result.docs.map((doc) => doc.data());
    }

    async unfollowUser(userId: string, followerId: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection('Follow-Details')
        .where('userId', '==', userId)
        .where('followerId', '==', followerId)
        .get();
        result.docs.map((doc) => doc.ref.delete());
    }
}
