import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async addUser(name: string, surname: string, email: string): Promise<void> {
    await this.db.collection('Users').add({
      name,
      surname,
      email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async getUsers(): Promise<admin.firestore.QuerySnapshot> {
    const data = await this.db.collection('Users').orderBy('timestamp', 'desc').get();
    console.log("DATA: " + data)
    return data;
  }
}
