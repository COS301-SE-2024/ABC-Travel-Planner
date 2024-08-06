import { ConfigModule } from "@nestjs/config"
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';

const firebaseProvider = {
  provide: 'FIREBASE_ADMIN',
  inject: [],
  useFactory: () => {
    const envPath = path.resolve(__dirname, '../../.env.local');
    const result = dotenv.config({ path: envPath });
    if (result.error) {
      console.error('Failed to load environment variables:', result.error);
      throw result.error; // Or handle the error appropriately
    }

    const firebaseConfig = {
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSAL_DOMAIN,
    } as admin.ServiceAccount;

    try {
      return admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
        storageBucket: `${firebaseConfig.projectId}.appspot.com`,
      });
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      throw error;
    }
  },
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    firebaseProvider
  ],
  exports: [firebaseProvider],
})
export class FirebaseModule {}
