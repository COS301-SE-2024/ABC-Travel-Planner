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
import { PostsModule } from './posts/posts.module';
import { FollowsModule } from './follows/follow.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';
import { LikesModule } from './likes/likes.module';
// import { LikeModule } from './likes/like.module';
import { AuthModule } from './auth/auth.module';
import { ItineraryItemsModule } from './itinerary-items/itinerary-items.module';

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
    PostsModule,
    FollowsModule,
    CommentsModule,
    ImagesModule,
    LikesModule,
    ItineraryItemsModule,
    SearchModule,
    GoogleMapsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}

