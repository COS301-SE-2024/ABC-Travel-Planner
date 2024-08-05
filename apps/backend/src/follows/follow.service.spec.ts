import { Test, TestingModule } from '@nestjs/testing';
import { FollowsService } from './follow.service';

describe('FollowService', () => {
  let service: FollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowsService],
    }).compile();

    service = module.get<FollowsService>(FollowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
