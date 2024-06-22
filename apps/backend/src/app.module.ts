import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItineraryModule } from './itinerary/itinerary.module';

@Module({
  imports: [ItineraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
