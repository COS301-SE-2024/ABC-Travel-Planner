import { Controller } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import {Post, Body} from "@nestjs/common";


@Controller("comments")
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
    @Post("create")
    async createComment(
        @Body()
        body: {
            user_id: string;
            post_id: string;
            comment: string;
            username: string;
        }
    ) {
        return this.commentsService.createComment(
            body.user_id,
            body.post_id,
            body.comment,
            body.username,
        );
    }

    @Post("getComments")
    async getComments(
        @Body()
        body: {
            post_id: string;
        }
    ) {
        return this.commentsService.getComments(body.post_id);
    }

    @Post("getComment")
    async getComment(
        @Body()
        body: {
            commentId: string;
        }
    ) {
        return this.commentsService.getComment(body.commentId);
    }

    @Post("update")
    async updateComment(
        @Body()
        body: {
            commentId: string;
            comment: string;
        }
    ) {
        return this.commentsService.updateComment(body.commentId, body.comment);
    }

    @Post("delete")
    async deleteComment(
        @Body()
        body: {
            commentId: string;
        }
    ) {
        return this.commentsService.deleteComment(body.commentId);
    }


}