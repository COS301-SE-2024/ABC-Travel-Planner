import { Body, Controller, Post } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

@Controller('itinerary')
export class ItineraryController {
  constructor(private itineraryService: ItineraryService) {}

  @Post('getItineraries')
  async getItineraries(@Body() body: { user_id: string }) {
    return this.itineraryService.getItineraries(body.user_id);
  }

  @Post('create')
  async createItinerary(
    @Body()
    body: {
      name: string;
      location: string;
      user_id: string;
      imageUrl: string;
    },
  ) {
    try {
      return this.itineraryService.createItinerary(
        body.name,
        body.location,
        body.user_id,
        body.imageUrl,
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('getItinerary')
  async getItinerary(@Body() body: { itineraryId: string }) {
    return this.itineraryService.getItinerary(body.itineraryId);
  }

  @Post('update')
  async updateItinerary(
    @Body()
    body: {
      itineraryId: string;
      name: string;
      location: string;
      imageUrl: string;
    },
  ) {
    return this.itineraryService.updateItinerary(
      body.itineraryId,
      body.name,
      body.location,
      body.imageUrl,
    );
  }

  @Post('delete')
  async deleteItinerary(@Body() body: { itineraryId: string }) {
    return this.itineraryService.deleteItinerary(body.itineraryId);
  }

  @Post('share')
  async shareItinerary(@Body() body: { itineraryId: string }) {
    return this.itineraryService.shareItinerary(body.itineraryId);
  }

  @Post('getMySharedItineraries')
  async getMySharedItineraries(@Body() body: { user_id: string }) {
    return this.itineraryService.getMySharedItineraries(body.user_id);
  }

  @Post('addItineraryItem')
  async addItineraryItem(
    @Body()
    body: {
      itinerary_id: string;
      item_name: string;
      item_type: string;
      location: string;
      imageUrl: string;
      destination: string;
    },
  ) {
    return this.itineraryService.addItineraryItem(body.itinerary_id, body.item_name, body.item_type, body.location, body.imageUrl, body.destination);
  }

  @Post('getItineraryItems')
  async getItineraryItems(@Body() body: { itinerary_id: string }) {
    return this.itineraryService.getItineraryItems(body.itinerary_id);
  }

  @Post('likeItinerary')
  async likeItinerary(@Body() body: { itinerary_id: string, user_id: string }) {
    return this.itineraryService.likeItinerary(body.itinerary_id, body.user_id);
  }

  @Post('unlikeItinerary')
  async unlikeItinerary(@Body() body: { itinerary_id: string , user_id: string }) {
    return this.itineraryService.unlikeItinerary(body.itinerary_id, body.user_id);
  }

    @Post('userLikesItinerary')
    async userLikesItinerary(@Body() body: { itinerary_id: string , user_id: string }) {
        return this.itineraryService.userLikesItinerary(body.itinerary_id, body.user_id);

    }


    @Post('saveItinerary')
    async saveItinerary(@Body() body: { itinerary_id: string , user_id: string }) {
        return this.itineraryService.saveItinerary(body.itinerary_id, body.user_id);

    }

    @Post('unsaveItinerary')
    async unsaveItinerary(@Body() body: { itinerary_id: string , user_id: string }) {
        return this.itineraryService.unsaveItinerary(body.itinerary_id, body.user_id);
    }

    @Post('userSavedItinerary')
    async userSavedItinerary(@Body() body: { itinerary_id: string , user_id: string }) {
        return this.itineraryService.userSavedItinerary(body.itinerary_id, body.user_id);

    }

}
