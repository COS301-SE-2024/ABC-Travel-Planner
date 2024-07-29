import { Controller, Get, Param } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
    constructor(
        private readonly followService: FollowService
    ) {}

    @Get(':id')
    async getFollowers(@Param('id') userName: string) : Promise<any[]> {
        return await this.followService.getFollowers(userName);
    }

}
