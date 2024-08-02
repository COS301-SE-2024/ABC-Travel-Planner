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
    async postComment(@Body() body:  { data: {user_id: string, comment_string: string}, post_id: string }) : Promise<void> {
        if (!body.data.user_id) {
            throw new Error('User ID not included in body')
        }
        
        if (!body.post_id) {
            throw new Error('Post ID not included in body')
        }

        if (!body.data.comment_string) {
            throw new Error('Comment String not included in body')
        }

        return await this.commentsService.postComment(body.data.user_id, body.post_id, body.data.comment_string)
    }
}
