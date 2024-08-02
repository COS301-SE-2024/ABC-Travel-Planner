import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ImagesService {
    private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async getPostImage(filePath: string): Promise<string> {
    // const imageUrl = await getDownloadURL(storageRef);
    // try {
    //     console.log("ImageURL: " + imageUrl)
    //     return imageUrl;
    // } catch (error) {
    //     console.error(error);
    //     throw new Error('Image not found')
    // }
    
    const bucketName = this.firebaseApp.storage().bucket();
    console.log("BUCKET NAME: " + bucketName);

    const bucket = this.firebaseApp.storage().bucket();
    const file = bucket.file(filePath);

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2025',
    })

    return url;
  }
}