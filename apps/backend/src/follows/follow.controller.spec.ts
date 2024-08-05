import { Test, TestingModule } from '@nestjs/testing';
import { FollowsController } from './follow.controller';

describe('FollowController', () => {
  let controller: FollowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
    }).compile();

    controller = module.get<FollowsController>(FollowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
