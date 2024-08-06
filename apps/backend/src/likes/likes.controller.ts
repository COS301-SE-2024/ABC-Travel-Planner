import { Controller, Post,Body } from "@nestjs/common";
import { LikesService } from "./likes.service";

@Controller("likes")
export class LikesController {
    constructor(private likesService: LikesService) {}

    @Post("likePost")
    async likePost(
        @Body()
        body: {
            user_id: string;
            post_id: string;
        }
    ) {
        return this.likesService.likePost(body.user_id, body.post_id);
    }

    @Post("unlikePost")
    async unlikePost(
        @Body()
        body: {
            user_id: string;
            post_id: string;
        }
    ) {
        return this.likesService.unlikePost(body.user_id, body.post_id);
    }

    @Post("userLikesPost")
    async userLikesPost(
        @Body()
        body: {
            user_id: string;
            post_id: string;
        }
    ) {
        return this.likesService.userLikesPost(body.user_id, body.post_id);
    }
}