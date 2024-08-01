import { PartialType } from '@nestjs/mapped-types';
import { CreateItineraryItemDto } from './create-itinerary-item.dto';

export class UpdateItineraryItemDto extends PartialType(CreateItineraryItemDto) {}
