import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like-endpoint')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('isLiked')
    async isLiked(@Body() body: {post_id: string, user_id: string}) : Promise<boolean> {
        return await this.likeService.isLiked(body.post_id, body.user_id);
    }

    @Post('unlike')
    async unlike(@Body() body: {post_id: string, user_id: string}) : Promise<boolean> {
        return await this.likeService.unlike(body.post_id, body.user_id);
    }

    @Post('like')
    async like(@Body() body: {post_id: string, user_id: string}) : Promise<boolean> {
        return await this.likeService.like(body.post_id, body.user_id);
    }
}
