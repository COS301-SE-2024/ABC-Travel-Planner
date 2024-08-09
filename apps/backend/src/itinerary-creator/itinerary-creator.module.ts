import { Module } from '@nestjs/common';
import { ItineraryCreatorService } from './itinerary-creator.service';
import { ItineraryCreatorController } from './itinerary-creator.controller';
import { SearchModule } from 'src/search/search.module';
@Module({
  imports: [SearchModule],
  controllers: [ItineraryCreatorController],
  providers: [ItineraryCreatorService],
})
export class ItineraryCreatorModule {}
