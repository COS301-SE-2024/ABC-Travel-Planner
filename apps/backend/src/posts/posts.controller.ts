import { Controller, Get, Post, Body, InternalServerErrorException, Param } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Post()
    async addPost(@Body() body: { user_id: string; post_description: string; post_likes: string, post_title: string }): Promise<void> {
        try {
            await this.postService.addPost(body.user_id, body.post_description, body.post_likes, body.post_title);
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get()
    async getPosts(): Promise<any[]> {
        try {
            return await this.postService.getPosts();
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get(':id')
    async getPostsById(@Param('id') id: string): Promise<any[]> {
        try {
            return await this.postService.getPostsById(id);
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
