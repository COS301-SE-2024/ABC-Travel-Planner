import { Controller, Post,Body } from "@nestjs/common";
import { FollowsService } from "./follows.service";

@Controller('follows')
export class FollowsController {
    constructor(private followsService: FollowsService) {}

    @Post('follow')
    async followUser(@Body() body: {userId: string, followerId: string}) {
        return this.followsService.followUser(body.userId, body.followerId);
    }

    @Post('unfollow')
    async unfollowUser(@Body() body: {userId: string, followerId: string}) {
        return this.followsService.unfollowUser(body.userId, body.followerId);
    }

    @Post('followers')
    async getFollowers(@Body() body: {userId: string}) {
        return this.followsService.getFollowers(body.userId);
    }

    @Post('following')
    async getFollowing(@Body() body: {userId: string}) {
        return this.followsService.getFollowing(body.userId);
    }
    
    
}