import { Injectable, Inject } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class CommentsService {
    constructor(
        @Inject("FIREBASE_ADMIN") private readonly firebaseApp: admin.app.App
    ) {}
    
    async createComment(
        user_id: string,
        post_id: string,
        comment: string,
        username: string
    ) {
        const result = await this.firebaseApp
        .firestore()
        .collection("Comments")
        .add({
            user_id,
            post_id,
            comment,
            username,
            timestamp: new Date(),
        });
        
        await this.firebaseApp
        .firestore()
        .collection("Comments")
        .doc(result.id)
        .update({ id: result.id });
        return result.id;
    }
    
    async getComments(post_id: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection("Comments")
        .where("post_id", "==", post_id)
        .get();
        return result.docs.map((doc) => doc.data());
    }
    
    async getComment(commentId: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection("Comments")
        .doc(commentId)
        .get();
        return result.data();
    }
    
    async updateComment(commentId: string, comment: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection("Comments")
        .doc(commentId)
        .update({ comment });
        return result;
    }
    
    async deleteComment(commentId: string) {
        const result = await this.firebaseApp
        .firestore()
        .collection("Comments")
        .doc(commentId)
        .delete();
        return result;
    }
  }