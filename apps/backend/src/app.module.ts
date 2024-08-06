import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SearchModule } from './search/search.module';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

import { ItineraryItemsModule } from './itinerary-items/itinerary-items.module';
import { FollowsModule } from './follows/follows.module';
import { ActivityModule } from './activity/activity.module';


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
    AuthModule,
    SearchModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    ItineraryItemsModule,
    FollowsModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}

