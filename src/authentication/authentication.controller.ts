import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService){
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto){
        return await this.authenticationService.login(loginUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('forgot')
    async forgot(@Param() params): Promise<string>{
        return await this.authenticationService.forgotPassword()
    }

}
