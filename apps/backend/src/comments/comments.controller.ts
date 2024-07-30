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

        return this.commentsService.getComments(id);
    }

    @Post('post')
    async postComment(@Body() body:  {user_id: string, postId: string, commentString: string, commentTitle: string}) : Promise<void> {
        if (!body.user_id) {
            throw new Error('User ID not included in body')
        }
        
        if (!body.postId) {
            throw new Error('Post ID not included in body')
        }

        if (!body.commentString) {
            throw new Error('Comment String not included in body')
        }

        if (!body.commentTitle) {
            throw new Error('Comment Title not included in body')
        }

        return this.commentsService.postComment(body.user_id, body.postId, body.commentString, body.commentTitle)
    }
}
