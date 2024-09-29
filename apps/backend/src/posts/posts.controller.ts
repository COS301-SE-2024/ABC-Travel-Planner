import { Controller, Post, Get, Body } from "@nestjs/common";
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

    @Get()
    async getPostsFeed(): Promise<any[]> {
        try {
            return await this.postsService.getPostsFeed();
        } 
        catch (error) {
            throw new Error(error.message);
        }
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

    @Post("incrementLikes")
    async incrementLikes(
        @Body()
        body: {
            postId: string;
        }
    ) {
        return this.postsService.increaseLikes(body.postId);
    }

    @Post("decrementLikes")
    async decrementLikes(
        @Body()
        body: {
            postId: string;
        }
    ) {
        return this.postsService.decreaseLikes(body.postId);
    }

    @Post("delete")
    async deletePost(
        @Body()
        body: {
            postId: string,
            userId: string
        }
    ) {
        return this.postsService.deletePost(body.postId, body.userId)
    }
}