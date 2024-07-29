import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow-endpoint')
export class FollowController {
    constructor(
        private readonly followService: FollowService
    ) {}

    @Get('followers/:id')
    async getFollowers(@Param('id') userName: string) : Promise<any[]> {
        return await this.followService.getFollowers(userName);
    }

    @Get('following/:id')
    async getFollowing(@Param('id') userName: string) : Promise<any[]> {
        return await this.followService.getFollowing(userName);
    }

    @Post('follow')
    async follow(@Body() body: {currUser: string, userToFollow: string}) {
        if (!body.currUser) {
            throw Error('No current user field specified')
        }

        if (!body.userToFollow) {
            throw Error('No userToFollow field specified')
        }

        return await this.followService.follow(body.currUser, body.userToFollow)
    }

    @Post('unfollow')
    async unfollow(@Body() body: {currUser: string, userToUnfollow: string}) {
        if (!body.currUser) {
            throw Error('No current user field specified')
        }

        if (!body.userToUnfollow) {
            throw Error('No userToUnfollow field specified')
        }

        return await this.followService.unfollow(body.currUser, body.userToUnfollow)
    }
}
