import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}
  async updateEmail(email: string, user_id: string) {
    const result = await this.firebaseApp.auth().updateUser(user_id, { email });

    return result;
  }

  async changePassword(password: string, user_id: string) {
    const result = await this.firebaseApp
      .auth()
      .updateUser(user_id, { password });
    return result;
  }

  async changeSharingMode(sharingMode: string, user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Users')
      .doc(user_id)
      .update({ sharingMode });

    return result;
  }

  async deleteAccount(user_id: string) {
    await this.firebaseApp
      .firestore()
      .collection('Users')
      .doc(user_id)
      .delete();

    await this.firebaseApp.auth().deleteUser(user_id);
  }
}
