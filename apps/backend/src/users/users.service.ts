import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import axios from 'axios'

@Injectable()
export class UsersService {
  private db: admin.firestore.Firestore;
  private backendUrl: string;
  
  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
    this.db = firebaseApp.firestore();
    this.backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''
  }

  async addUser(name: string, surname: string, email: string): Promise<void> {
    try {
      await this.db.collection('Users').add({
        name,
        surname,
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to add user to the database');
    } 
  }

  async getUsers(): Promise<any[]> {
    try {
      const data = await this.db
            .collection('Users')
            .orderBy('username', 'desc')
            .get();

      return data?.docs?.map(user => user.data()) ?? [];
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to fetch users from the database');
    }
  }

  async getUserById(id: string) : Promise<any> {
    try {
      const data = await this.db
            .collection('Users')
            .where('user_id', '==', id)
            .get()

      return data?.docs?.map(user => user.data()) ?? 'NOUSERFOUND';
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(`Failed to fetch user ${id} from the database`);
    }
  }

  async deleteUserById(userId: string) : Promise<any> {
    //Comment deletion...
      const commentDir = this.firebaseApp
            .firestore()
            .collection('Comments')
            
      const commentsSnapshot = await commentDir
          .where('user_id', '==', userId)
          .get()

      if (commentsSnapshot.empty) {
        console.log("Could not delete... No matching docs found")
        throw new Error('Could not delete item(s) - not found')
      }

      commentsSnapshot.forEach((commentItem) => {
        commentItem.ref.delete();
        console.log("Comment document deleted successfully")
      })

    //Likes deletion...
      const likesDir = this.firebaseApp
      .firestore()
      .collection('Likes')
      
      console.log(likesDir)
      
      const likesSnapshot = await likesDir
      .where('user_id', '==', userId)
      .get()
      
      if (!likesSnapshot.empty) {
        likesSnapshot.forEach(async (likeItem) => {
          // decrement post likes by 1
          const reqBody = {
            method: 'POST',
            body: {
              postId: JSON.stringify(likeItem.data().post_id)
            }
          }

          try {
            const decrementReq = await axios(`${this.backendUrl}/posts/decrementLikes`, reqBody)
            if (decrementReq.status == 200 || decrementReq.status == 201) {
              console.log("Like decremented!")
              likeItem.ref.delete();
              console.log("Like document deleted successfully")
            } else {
              console.error("-- COULD NOT decrement post likes!!!")
            }
          } catch (error) {
            console.error(error.message)
          }
        })
      }

      //Posts deletion
      const postsDir = this.firebaseApp
      .firestore()
      .collection('Posts')
      
      console.log(postsDir)
      
      const postsSnapshot = await postsDir
      .where('user_id', '==', userId)
      .get()
      
      if (!postsSnapshot.empty) {
        postsSnapshot.forEach(async (likeItem) => {
          likeItem.ref.delete()
          console.log("Post deleted!")
        })
      } else {
        console.log("No posts to delete...")
      }
  }
}