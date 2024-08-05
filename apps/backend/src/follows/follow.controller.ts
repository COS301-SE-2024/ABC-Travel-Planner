import { Controller, Post,Body } from "@nestjs/common";
import { FollowsService } from "./follow.service";

@Controller('follows')
export class FollowsController {
    constructor(private followsService: FollowsService) {}

    @Post('follow')
    async followUser(@Body() body: {user_id: string, follower_id: string}) {
        return this.followsService.followUser(body.user_id, body.follower_id);
    }

    @Post('followers')
    async getFollowers(@Body() body: {user_id: string}) {
        return this.followsService.getFollowers(body.user_id);
    }

    @Post('following')
    async getFollowing(@Body() body: {user_id: string}) {
        return this.followsService.getFollowing(body.user_id);
    }

    @Post('isFollowing')
    async isFollowing(@Body() body: {user_id: string, follower_id: string}) {
        return this.followsService.isFollowing(body.user_id, body.follower_id);
    }
}