import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './project-admin.json';

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useValue: firebaseApp,
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
