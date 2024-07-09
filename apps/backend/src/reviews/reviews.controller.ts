import { Controller, Get, Post, Body, Param, InternalServerErrorException } from '@nestjs/common';
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

        try {
            await this.reviewService.addReview(body.name, body.surname, body.email, body.review_text, body.rating, body.destination_id);
        } catch (error) {
            throw new InternalServerErrorException('Failed to add review to the database');
        }
    }

    @Get(':id')
    async getReviewById(@Param('id') id: number): Promise<any[]> {
        try {
            const data = await this.reviewService.getReviewById(id);
            if (data.length == 0) {
                console.log("No reviews have been found on this destination id")
            }
            return data
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve reviews from database');
        }
    }
}
