import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryCreatorController } from './itinerary-creator.controller';
import { ItineraryCreatorService } from './itinerary-creator.service';

describe('ItineraryCreatorController', () => {
  let controller: ItineraryCreatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryCreatorController],
      providers: [ItineraryCreatorService],
    }).compile();

    controller = module.get<ItineraryCreatorController>(ItineraryCreatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
