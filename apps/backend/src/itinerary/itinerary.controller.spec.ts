import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryController } from './itinerary.controller';

describe('ItineraryController', () => {
  let controller: ItineraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryController],
    }).compile();

    controller = module.get<ItineraryController>(ItineraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
