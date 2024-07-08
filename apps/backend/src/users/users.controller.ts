import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as admin from 'firebase-admin';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async addUser(@Body() body: { name: string; surname: string; email: string }): Promise<void> {
        await this.userService.addUser(body.name, body.surname, body.email);
    }

    @Get()
    async getUsers(): Promise<any[]> {
        const snapshot = await this.userService.getUsers();
        console.log(snapshot);
        return snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => doc.data());
    }
}
