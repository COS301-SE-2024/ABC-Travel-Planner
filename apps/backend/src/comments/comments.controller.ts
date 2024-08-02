import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) {}

    // The id corresponds to the postId...
    @Get(':id')
    async getComments(@Param('id') id: string) : Promise<any[]> {
        if (!id) {
            throw new Error('Post ID not included in body')
        }

        return await this.commentsService.getComments(id);
    }

    @Post('post/home')
    async postComment(@Body() body:  {user_id: string, post_id: string, comment_string: string, comment_title: string}) : Promise<void> {
        if (!body.user_id) {
            throw new Error('User ID not included in body')
        }
        
        if (!body.post_id) {
            throw new Error('Post ID not included in body')
        }

        if (!body.comment_string) {
            throw new Error('Comment String not included in body')
        }

        if (!body.comment_title) {
            throw new Error('Comment Title not included in body')
        }

        return await this.commentsService.postComment(body.user_id, body.post_id, body.comment_string, body.comment_title)
    }
}
