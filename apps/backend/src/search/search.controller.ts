import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('places')
  async searchPlaces(@Query('textQuery') textQuery: string, @Query('type') type: string): Promise<any> {
    return this.searchService.searchPlaces(textQuery, type);
  }

  @Get('user')
  async searchUser(@Query('user') user: string): Promise<any> {
    return this.searchService.searchProfile(user);
  }

  @Get('detailedPlace')
  async detailedPlaces(@Query('locationId') textQuery: string): Promise<any> {
    return this.searchService.getDetailedPlace(textQuery);
  }
}
