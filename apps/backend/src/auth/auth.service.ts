import { Injectable, Inject } from "@nestjs/common";
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {}
    async updateEmail(email: string, user_id: string) {
        const result =  await this.firebaseApp.auth().updateUser(user_id, { email });
        return result;
    }
}