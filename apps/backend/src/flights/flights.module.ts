import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

@Module({
  imports: [HttpModule],
  providers: [FlightsService],
  controllers: [FlightsController],
})
export class FlightsModule {}