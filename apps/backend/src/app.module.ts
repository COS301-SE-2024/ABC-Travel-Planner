import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ItineraryModule, UsersModule, FirebaseModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
