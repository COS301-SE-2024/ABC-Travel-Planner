import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Post, Body, InternalServerErrorException } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('UpdateEmail')
    async updateEmail(@Body() body: { email: string , user_id: string}) {
        try {
            const result = await this.authService.updateEmail(body.email, body.user_id);
            return result;
        } 
        catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}