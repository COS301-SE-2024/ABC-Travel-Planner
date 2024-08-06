import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ImagesService {
    private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async getPostImage(id: string): Promise<GetSignedUrlResponse> {
    const bucket = this.firebaseApp.storage().bucket();
    
    //Accounting for both .jpg files and .png files
    let file = bucket.file(`Posts/${id}.jpg`);
    let fileExists = await file.exists();
    let data = fileExists[0];

    if (data) {
    //   console.log(await file.getSignedUrl({
    //     action: 'read',
    //     expires: '11-11-2024',
    // }));

    } else {
      console.log("JPG does not exist!")
      file = bucket.file(`Posts/${id}.png`);
      fileExists = await file.exists();
      data = fileExists[0];

      if (data) {
      //   console.log(await file.getSignedUrl({
      //   action: 'read',
      //   expires: '11-11-2024',
      // }));     
      
      } else {
        console.log("PNG does not exist!")
        console.error('File does not exist for post - loading default image')
        file = bucket.file(`Posts/placeholder.png`)
        fileExists = await file.exists();
        data = fileExists[0];
        if (data) {
          //
        }  else {
          console.log("Placeholder image doesn't exist?")
        }
      }
    }

    const expiryDate = this.getExpiry();
    // console.log(expiryDate)

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expiryDate,
    })

    return { url };
  }

  async uploadImage(image_name : string, base64 : string) : Promise<void> {
    //Upload logic...
    console.log(image_name);
    console.log(base64);
  }

  getExpiry() : string {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + 1);

    const currMonth = ('0' + (currDate.getMonth() + 1)).slice(-2); // Months are zero-based
    const currDay = ('0' + currDate.getDate()).slice(-2);
    const currYear = currDate.getFullYear();

    return `${currMonth}-${currDay}-${currYear}`;
  }

  // generateFirebaseId() : string {
  //   const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let id = '';
    
  //   for (let i = 0; i < 20; i++) {
  //     id += charset.charAt(Math.floor(Math.random() * charset.length));
  //   }
    
  //   return id;
  // }
}

interface GetSignedUrlResponse {
  url: string;
  expires?: number;
}