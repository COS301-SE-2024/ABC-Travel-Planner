import { HttpException, HttpStatus } from '@nestjs/common';

export class addException extends HttpException {
    constructor(field: string, value: string) {
        super(`${field}: Could not add ${value} to ${field}`, HttpStatus.NOT_FOUND)
    }
}