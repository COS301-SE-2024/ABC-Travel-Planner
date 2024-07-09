import { Controller, Get, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async addUser(@Body() body: { name: string; surname: string; email: string }): Promise<void> {
        try {
            await this.userService.addUser(body.name, body.surname, body.email);
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get()
    async getUsers(): Promise<any[]> {
        try {
            return await this.userService.getUsers();
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
