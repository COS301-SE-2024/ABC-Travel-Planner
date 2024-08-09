import { Controller, Post, Body } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('getLikesCount')
  async getLikesCount(@Body() body: { userId: string }) {
    return this.activityService.countLikesByUser(body.userId);
  }

  @Post('getCommentsCount')
  async getCommentsCount(@Body() body: { userId: string }) {
    return this.activityService.countCommentsByUser(body.userId);
  }

  @Post('getPostsCount')
  async getPostsCount(@Body() body: { userId: string }) {
    return this.activityService.countPostsByUser(body.userId);
  }
}
