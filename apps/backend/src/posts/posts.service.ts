import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';

interface refinedData {
  id: string,
  user_id: string,
  caption: string,
  imageUrl: string,
  post_likes: number,
  timestamp: number,
}

interface rawData {
  id: string,
  user_id: string,
  caption: string,
  imageUrl: string,
  post_likes: number,
  timestamp: {
    _seconds: number,
    _nanoseconds: number
  },
}

@Injectable()
export class PostsService {
    private lastPostId: string;                 //Stores last post retrieved to simplify fetching
    private LIMIT_SIZE: number                  //Retrieve this many posts per call

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {
    this.lastPostId = '';
    this.LIMIT_SIZE = 50;
  }
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

  async deletePost(postId: string, userId: string) {
    try {
      //Check if it exists...
      const postsDir = this.firebaseApp
          .firestore()
          .collection('Posts')
          
      console.log(postsDir)
          
      const postsSnapshot = await postsDir
          .where('user_id', '==', userId)
          .where('id', '==', postId)
          .limit(1)
          .get()

      console.log(postsSnapshot)

      if (postsSnapshot.empty) {
        console.log("Could not delete... No matching docs found")
        throw new Error('Could not delete item - not found')
      }

      //Deleting item...
      postsSnapshot.forEach((item) => {
        item.ref.delete();
        console.log("Document deleted successfully")
      })
    } catch (error) {
        console.error('Could not delete document: ', error.message)
        return error.message
    }
  }

  async getPostsFeed(): Promise<any[]> {
    try {
      let data
        
      //Get LIMIT_SIZE posts at a time...
      if (this.lastPostId === '') {
        data = await this.firebaseApp
                          .firestore().collection('Posts')
                          .orderBy('timestamp', 'desc')
                          .limit(this.LIMIT_SIZE)
                          .get();
        
      } else {
        data = await this.firebaseApp
                          .firestore().collection('Posts')
                          .orderBy('timestamp', 'desc')
                          .startAfter(this.lastPostId)
                          .limit(this.LIMIT_SIZE)
                          .get();
      }

      const posts = data.docs.map(post => ({
        id: post.id,
        ...post.data(),
      }));

      this.lastPostId = posts[posts.length-1].id
      console.log(posts)

      const newData: refinedData[] = posts.map((item: rawData) => ({
          id: item.id,
          user_id: item.user_id,
          caption: item.caption,
          imageUrl: item.imageUrl,
          post_likes: item.post_likes,
          timestamp: item.timestamp._seconds,
        }));

      return this.randomizeFeed(newData) ?? [];
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to fetch posts from the database -- Check logs');
    }
  }

  private randomizeFeed(array: any[]) : any[] {
    if (!array) {
      return [];
    }
    let chosen: number[] = []
    let randomizedData: any[] = []
  
    //Generate random numbers in some order...
    for (let i = 0; i < array.length; i++) {
      let random = Math.round(Math.random() * (array.length))
      while (chosen.includes(random) || random >= array.length) {
          random = Math.round(Math.random() * (array.length))
      }
      chosen.push(random)
    }
  
    for (let i = 0; i < array.length; i++) {
        randomizedData.push(array.at(chosen?.at(i) ?? 0))
    }   
          
    return randomizedData
  }


}