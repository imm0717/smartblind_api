import { AuthenticationService } from './authentication.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService){
    }

    @Get('login')
    async login(@Body('email') email:string, @Body('password') password:string): Promise<string>{
        return await this.authenticationService.loggin(email, password)
    }

    @Post('register')
    async register(): Promise<string>{
        return await this.authenticationService.register()
    }

    @Get('forgot')
    async forgot(): Promise<string>{
        return await this.authenticationService.forgotPassword()
    }

}
