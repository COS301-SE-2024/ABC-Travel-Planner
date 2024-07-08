import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewService: ReviewsService) {}

    @Post()
    async addReview(@Body() body: { name: string; surname: string; email: string; review_text: string; rating: number; destination_id: number }): Promise<void> {
        if (!body.name || !body.surname || !body.email || !body.review_text || !body.rating || !body.destination_id) {
            console.log("Not all parameters received are valid/existant")
            return;
        }
        await this.reviewService.addReview(body.name, body.surname, body.email, body.review_text, body.rating, body.destination_id);
    }

    @Get(':id')
    async getReviewById(@Param('id') id: number): Promise<any[]> {
        return await this.reviewService.getReviewById(id);
    }
}
