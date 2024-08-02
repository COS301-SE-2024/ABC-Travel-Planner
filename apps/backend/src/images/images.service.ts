import { Injectable, Inject } from "@nestjs/common";
import * as admin from 'firebase-admin';

@Injectable()
export class ImagesService {
    private db: admin.firestore.Firestore;
    private storage: admin.storage.Storage;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
    this.storage = firebaseApp.storage();
  }

  async getImage(filePath: string): Promise<string> {
    const image = this.storage.bucket().file(filePath);
    const [url] = await image.getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000,
    })
    return url;
  }
}