import { Controller, Post, Body } from '@nestjs/common';
import { BlockService } from './block.service';
@Controller('block')
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post('blockUser')
  async blockUser(@Body() body: { user_id: string; blocked_id: string }) {
    return this.blockService.blockUser(body.user_id, body.blocked_id);
  }

  @Post('blockedUsers')
  async getBlockedUsers(@Body() body: { user_id: string }) {
    return this.blockService.getBlockedUsers(body.user_id);
  }

  @Post('isBlocked')
  async isBlocked(@Body() body: { user_id: string; blocked_id: string }) {
    return this.blockService.isBlocked(body.user_id, body.blocked_id);
  }

  @Post('blockedBy')
  async blockedBy(@Body() body: { user_id: string }) {
    return this.blockService.blockedBy(body.user_id);
  }
}
