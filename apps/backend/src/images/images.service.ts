import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ImagesService {
    private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async getPostImage(id: string): Promise<string> {
    const bucket = this.firebaseApp.storage().bucket();
    // OR PNG...

    let file = bucket.file(`Posts/${id}.jpg`);
    if (!file.exists()) {
        file = bucket.file(`Posts/${id}.png`);
        if (!file.exists()) {
          throw new Error('File does not exist in storage bucket');
        }
    }

    const expiryDate = this.getExpiry();
    console.log(expiryDate)

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expiryDate,
    })

    return url;
  }

  getExpiry() : string {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + 1);

    const currMonth = ('0' + (currDate.getMonth() + 1)).slice(-2); // Months are zero-based
    const currDay = ('0' + currDate.getDate()).slice(-2);
    const currYear = currDate.getFullYear();

    return `${currMonth}-${currDay}-${currYear}`;
  }
}