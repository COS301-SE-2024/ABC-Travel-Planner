import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ReviewsModule } from './reviews/reviews.module';
import * as path from 'path';
import { PostsModule } from './posts/posts.module';
import { FollowsModule } from './follows/follow.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';
import { LikeModule } from './likes/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env.local'),
      isGlobal: true, // Makes ConfigModule globally available
    }),
    ItineraryModule, 
    UsersModule, 
    FirebaseModule, 
    ReviewsModule,
    PostsModule,
    FollowsModule,
    CommentsModule,
    ImagesModule,
    LikeModule,
    GoogleMapsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
