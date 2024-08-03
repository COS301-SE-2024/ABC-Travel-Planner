import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async addUser(name: string, surname: string, email: string): Promise<void> {
    try {
      await this.db.collection('Users').add({
        name,
        surname,
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to add user to the database');
    } 
  }

  async getUsers(): Promise<any[]> {
    try {
      const data = await this.db
            .collection('Users')
            .orderBy('username', 'desc')
            .get();

      return data?.docs?.map(user => user.data()) ?? [];
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to fetch users from the database');
    }
  }

  async getUserById(id: string) : Promise<any> {
    try {
      const data = await this.db
            .collection('Users')
            .where('user_id', '==', id)
            .get()

      return data?.docs?.map(user => user.data()) ?? 'NOUSERFOUND';
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(`Failed to fetch user ${id} from the database`);
    }
  }
}
