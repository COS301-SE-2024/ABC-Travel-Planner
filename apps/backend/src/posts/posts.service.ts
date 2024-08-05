import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PostsService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}
  async createPost(user_id: string, caption: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .add({ caption, user_id, timestamp: new Date(), post_likes: 0 });
    await this.firebaseApp
      .firestore()
      .collection('Posts')
      .doc(result.id)
      .update({ id: result.id });
    return result.id;
  }

  async updatePostImage(postId: string, imageUrl: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .doc(postId)
      .update({ imageUrl });
    return result;
  }
  async getPosts(user_id: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .where('user_id', '==', user_id)
      .orderBy('timestamp', 'desc')
      .get();

    const postsWithComments = await Promise.all(
      result.docs.map(async (doc) => {
        const fetchComments = async () => {
          const comments = await this.firebaseApp
            .firestore()
            .collection('Comments')
            .where('post_id', '==', doc.id)
            .orderBy('timestamp', 'asc')
            .get();
          const temp = comments.docs.map((comment) => comment.data());
          return {
            ...doc.data(),
            comments: temp,
          };
        };

        return fetchComments();
      }),
    );

    return postsWithComments;
  }

  async getPost(postId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .doc(postId)
      .get();
    const fetchComments = async () => {
      const result = await this.firebaseApp
        .firestore()
        .collection('Comments')
        .where('post_id', '==', postId)
        .orderBy('timestamp', 'asc')
        .get();
      return result.docs.map((doc) => doc.data());
    };
    const comments = await fetchComments();
    return { ...result.data(), comments: comments };
  }

  async updatePost(postId: string, caption: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .doc(postId)
      .update({ caption });
    return result;
  }

  async increaseLikes(postId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .doc(postId)
      .update({ post_likes: admin.firestore.FieldValue.increment(1) });
    return result;
  }

  async decreaseLikes(postId: string) {
    const result = await this.firebaseApp
      .firestore()
      .collection('Posts')
      .doc(postId)
      .update({ post_likes: admin.firestore.FieldValue.increment(-1) });
    return result;
  }
}
