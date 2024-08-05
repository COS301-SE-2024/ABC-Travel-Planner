import { Injectable, Inject, InternalServerErrorException, BadRequestException } from "@nestjs/common";
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
    private db: admin.firestore.Firestore;
    private lastPostId: string;                 //Stores last post retrieved to simplify fetching
    private LIMIT_SIZE: number                  //Retrieve this many posts per call

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
    this.lastPostId = '';
    this.LIMIT_SIZE = 50;
  }

  //To reset feed if visiting another page and coming back
  reset() {
    this.lastPostId = ''
  }

  async addPost(user_id: string, image_url: string, location_id: string, post_description: string, post_title: string): Promise<void> {
    if (!user_id || !post_description || !post_title) {
        throw new BadRequestException('Not all fields are filled in/valid')
    }
    // const user_id = 'User5';
    // const post_description = "A sensational place to rest for a few days. Definitely go check it out :)"
    // const post_likes = 0
    // const post_title = 'Resting in the mountains...'

    try {
      const addRes = await this.db.collection('Posts').add({
        user_id, 
        image_url: image_url,
        location_id: location_id ?? 'NULL',
        post_description,
        post_likes: 0,
        post_title,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })

      const post_id = addRes.id;
      const createCommentFolder = await this.db.collection('Comments').doc(post_id).set({
        user_id: user_id,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to add post to the database -- Check logs');
    } 
  }

  async getPosts(): Promise<any[]> {
    try {
      let data
      let posts: any
        
      //Get 50 posts at a time...
      if (this.lastPostId === '') {
        data = await this.db.collection('Posts')
                            .orderBy('timestamp', 'desc')
                            .limit(this.LIMIT_SIZE)
                            .get();
        
      } else {
        data = await this.db.collection('Posts')
                            .orderBy('timestamp', 'desc')
                            .startAfter(this.lastPostId)
                            .limit(this.LIMIT_SIZE)
                            .get();
      }

      posts = data.docs.map(post => ({
        id: post.id,
        ...post.data(),
      }));

      this.lastPostId = posts[posts.length-1].id
      console.log(posts)

      //Remember to take the user_id and make a call to get their user_name, and then pass the user_name back...

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

  async getPostsById(id: string): Promise<any[]> {
    if (!id) {
        throw new BadRequestException('The id field was not specified')
    }

    try {
        const data = await this.db.collection('Posts')
                                  .where('location_id', '==', id)
                                  .orderBy('timestamp', 'desc')
                                  .limit(50)
                                  .get()
        return data?.docs?.map(post => post.data()) ?? [];
    }
    catch (error) {
        console.log(error)
        throw new InternalServerErrorException('Failed to fetch posts by id -- Check logs')
    }
  }

  private randomizeFeed(array: any[]) : any[] {
    if (!array) {
      return [];
    }
  
    let chosen: number[] = []
    let randomizedData: any[] = []
    // console.log("Original data:\n" + JSON.stringify(array))
  
    //Generate random numbers in some order...
    for (let i = 0; i < array.length; i++) {
      let random = Math.round(Math.random() * (array.length))
      while (chosen.includes(random) || random >= array.length) {
          random = Math.round(Math.random() * (array.length))
      }
  
      chosen.push(random)
    }
  
    // console.log("Chosen numbers:\n" + chosen)
    for (let i = 0; i < array.length; i++) {
        randomizedData.push(array.at(chosen?.at(i) ?? 0))
    }   
          
    // console.log("Randomized data:\n" + JSON.stringify(randomizedData))
    return randomizedData
  }
}