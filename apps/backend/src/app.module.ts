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
import { FollowModule } from './follow/follow.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { CommentsModule } from './comments/comments.module';

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
    FollowModule,
    CommentsModule,
    GoogleMapsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
