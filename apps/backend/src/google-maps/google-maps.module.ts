import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Use @nestjs/axios
import { GoogleMapsService } from './google-maps.service';
import { GoogleMapsController } from './google-maps.controller';


@Module({
  imports: [HttpModule],
  providers: [GoogleMapsService],
  controllers: [GoogleMapsController],
})
export class GoogleMapsModule {}
