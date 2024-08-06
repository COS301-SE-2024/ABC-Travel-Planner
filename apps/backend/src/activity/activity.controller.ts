import { Controller, Get, Param,Post,Body } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('getLikesCount')
  async getLikesCount(@Body() body: {userId: string}) {
    return this.activityService.countLikesByUser(body.userId);
  }
}
