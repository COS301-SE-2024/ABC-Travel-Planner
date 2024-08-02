import { Controller, Get, Body, Post, Query, Res } from '@nestjs/common';
import { ImagesService } from '../images/images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imageservice: ImagesService) {}

    @Get()
    async getImage(@Query('id') id: string) : Promise<string> {
        return await this.imageservice.getPostImage(id);
    }

    @Post()
    async uploadImage(@Body() body: {image_name: string, base64: string}) : Promise<void> {
        return await this.imageservice.uploadImage(body.image_name, body.base64);
    }
}
