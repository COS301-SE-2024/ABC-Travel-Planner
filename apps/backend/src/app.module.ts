import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItineraryModule } from './itinerary/itinerary.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ['.env.local',], isGlobal: true, }), ItineraryModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
