import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class BlockService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async blockUser(user_id: string, blocked_id: string) {
    const r = await this.firebaseApp
      .firestore()
      .collection('Block-Details')
      .where('user_id', '==', user_id)
      .where('blocked_id', '==', blocked_id)
      .get();

    if (r.docs.length === 0) {
      const result = await this.firebaseApp
        .firestore()
        .collection('Block-Details')
        .add({
          user_id,
          blocked_id,
          timestamp: new Date(),
        });
      await this.firebaseApp
        .firestore()
        .collection('Block-Details')
        .doc(result.id)
        .update({ id: result.id });
      return result.id;
    } else {
      const result = await this.firebaseApp
        .firestore()
        .collection('Block-Details')
        .where('user_id', '==', user_id)
        .where('blocked_id', '==', blocked_id)
        .get();
      result.docs.map((doc) => doc.ref.delete());
    }
  }

  async getBlockedUsers(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Block-Details')
      .where('user_id', '==', user_id)
      .get();
    const temp = await Promise.all(
      result.docs.map(async (doc) => {
        const fetchUsers = async () => {
          const users = await this.firebaseApp
            .firestore()
            .collection('Users')
            .doc(doc.data().blocked_id)
            .get();

          return users.data();
        };
        return fetchUsers();
      }),
    );
    return temp;
  }

  async isBlocked(user_id: string, blocked_id: string) {
    const r = await this.firebaseApp
      .firestore()
      .collection('Block-Details')
      .where('user_id', '==', user_id)
      .where('blocked_id', '==', blocked_id)
      .get();

    return r.docs.length > 0;
  }

  async blockedBy(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Block-Details')
      .where('blocked_id', '==', user_id)
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
}
