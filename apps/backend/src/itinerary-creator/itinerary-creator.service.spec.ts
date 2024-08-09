import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryCreatorService } from './itinerary-creator.service';

describe('ItineraryCreatorService', () => {
  let service: ItineraryCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItineraryCreatorService],
    }).compile();

    service = module.get<ItineraryCreatorService>(ItineraryCreatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
