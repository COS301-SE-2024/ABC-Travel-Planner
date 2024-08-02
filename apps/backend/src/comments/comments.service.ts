import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { addException } from 'src/Exceptions/add-exception';
import { NotFoundException } from 'src/Exceptions/not-found-exception';

@Injectable()
export class CommentsService {
  private db: admin.firestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
  }

  async getComments(postId : string) : Promise<any[]> {
    try {
      const commentsData = await this.db.collection('Comments')
                                .doc(postId)
                                .collection('comments')
                                .get()
  
      const comments = commentsData.docs.map( comment => ({
        id: comment.id,
        ...comment.data()
      }))
  
      return comments ?? [];
    } catch (error) {
      console.error(error)
      throw new NotFoundException("comments", postId)
    }
  }

  async postComment(user_id: string, postId: string, commentString: string) : Promise<void> {
    try {
      const postCommentRes = await this.db.collection('Comments')
                                    .doc(postId)
                                    .collection('comments')
                                    .add({
                                      comment_string: commentString,
                                      post_id: postId,
                                      user_id: user_id
                                    })

    } catch (error) {
      console.error(error);
      throw new addException('comment', postId);
    }
  }
}
