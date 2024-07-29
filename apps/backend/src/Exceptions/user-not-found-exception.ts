import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
    constructor(userName: string) {
        super(`Username ${userName} not found`, HttpStatus.NOT_FOUND)
    }
}