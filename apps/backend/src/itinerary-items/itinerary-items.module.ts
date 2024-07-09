import { Module } from '@nestjs/common';
import { ItineraryItemsController } from './itinerary-items.controller';
import { ItineraryItemsService } from './itinerary-items.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [ItineraryItemsController],
    providers: [ItineraryItemsService],
})
export class ItineraryItemsModule {}
