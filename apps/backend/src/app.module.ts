import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SearchModule } from './search/search.module';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { ItineraryItemsModule } from './itinerary-items/itinerary-items.module';
import { FlightsModule } from './flights/flights.module';
import { FollowsModule } from './follows/follows.module';
import { ItineraryCreatorModule } from './itinerary-creator/itinerary-creator.module';
import { ActivityModule } from './activity/activity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AitaModule } from './aita/aita.module';
import { BlockModule } from './block/block.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env.local'),
      isGlobal: true, // Makes ConfigModule globally available
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'Images'),
    }),
    ItineraryModule,
    ItineraryItemsModule,
    UsersModule,
    FirebaseModule,
    ReviewsModule,
    AuthModule,
    SearchModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FollowsModule,
    ItineraryCreatorModule,
    ActivityModule,
    GoogleMapsModule,
    ChatModule,
    InvoiceModule,
    FlightsModule,
    AitaModule,
    BlockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
