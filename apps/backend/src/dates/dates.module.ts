import { Module } from '@nestjs/common';
import { DatesController } from './dates.controller';
import { DatesService } from './dates.service';

@Module({
  imports: [],
  controllers: [DatesController],
  providers: [DatesService],
})
export class DatesModule {}
