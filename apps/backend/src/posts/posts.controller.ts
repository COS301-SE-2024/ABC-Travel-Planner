import { Controller, Post,Body } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}
    @Post("create")
    async createPost(
        @Body()
        body: {
            user_id: string;
            caption: string;
        }
    ) {
        return this.postsService.createPost(
            body.user_id,
            body.caption,
        );
    }
    @Post("updateImage")
    async updatePostImage(
        @Body()
        body: {
            postId: string;
            imageUrl: string;
        }
    ) {
        return this.postsService.updatePostImage(body.postId, body.imageUrl);
    }

    @Post("getUserPosts")
    async getPosts(
        @Body()
        body: {
            user_id: string;
        }
    ) {
        return this.postsService.getPosts(body.user_id);
    }

    @Post("getPost")
    async getPost(
        @Body()
        body: {
            postId: string;
        }
    ) {
        return this.postsService.getPost(body.postId);
    }

    
}