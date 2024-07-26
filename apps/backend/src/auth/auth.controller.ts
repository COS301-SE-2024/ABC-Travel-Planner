import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService)
    {
        

    }
    @Post('signUp')
    signUp(){
        return 'I am signed up'

    }
    @Post('signIn')
    signIn(){
        return 'I am signed in'

    }
}