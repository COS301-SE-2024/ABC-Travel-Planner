import { Inject, Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";


@Injectable()
export class LikesService {
    constructor(
        @Inject("FIREBASE_ADMIN")
        private firebaseApp: admin.app.App,
    ) {}

    async likePost(user_id: string, post_id: string) {
        const result = await this.firebaseApp
            .firestore()
            .collection("Likes")
            .add({
                user_id,
                post_id,
                timestamp: new Date(),
            });
        await this.firebaseApp
            .firestore()
            .collection("Likes")
            .doc(result.id)
            .update({ id: result.id });
        return result.id;
    }

    async unlikePost(user_id: string, post_id: string) {
        const result = await this.firebaseApp
            .firestore()
            .collection("Likes")
            .where("user_id", "==", user_id)
            .where("post_id", "==", post_id)
            .get();
        const doc = result.docs[0];
        await this.firebaseApp
            .firestore()
            .collection("Likes")
            .doc(doc.id)
            .delete();
        return doc.id;
    }

    async userLikesPost(user_id: string, post_id: string) {
        const result = await this.firebaseApp
            .firestore()
            .collection("Likes")
            .where("user_id", "==", user_id)
            .where("post_id", "==", post_id)
            .get();
        return result.docs.length > 0;
    }
}