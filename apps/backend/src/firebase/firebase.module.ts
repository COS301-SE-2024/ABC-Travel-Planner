import { ConfigModule, ConfigService } from "@nestjs/config"
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_ADMIN',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('FIREBASE_TYPE'),
      project_id: configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      client_id: configService.get<string>('FIREBASE_CLIENT_ID'),
      auth_uri: configService.get<string>('FIREBASE_AUTH_URI'),
      token_uri: configService.get<string>('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: configService.get<string>('FIREBASE_AUTH_CERT_URL'),
      client_x509_cert_url: configService.get<string>('FIREBASE_CLIENT_CERT_URL'),
      universe_domain: configService.get<string>('FIREBASE_UNIVERSAL_DOMAIN'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    //The following is useful for multiple databases in one project
    // {
    //   provide: 'FIREBASE_ADMIN',
    //   useValue: firebaseProvider
    // }
    firebaseProvider
  ],
  exports: [firebaseProvider],
  // exports: ['FIREBASE_ADMIN']
})
export class FirebaseModule {}
