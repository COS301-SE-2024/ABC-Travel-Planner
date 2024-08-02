import { Controller, Get, Body, Query } from '@nestjs/common';
import { ImagesService } from '../images/images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imageservice: ImagesService) {}

    @Get()
    async getImage(@Query('path') filePath: string) : Promise<string> {
        return await this.imageservice.getImage(filePath);
    }

    
}