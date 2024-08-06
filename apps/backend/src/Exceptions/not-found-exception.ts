import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(field: string, value: string) {
        super(`${field}: ${value} not found`, HttpStatus.NOT_FOUND)
    }
}