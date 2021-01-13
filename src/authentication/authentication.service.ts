import { ConfigService } from '@nestjs/config';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

    private token_expiration_time: number;

    constructor(private readonly usersService: UsersService, private jwtService: JwtService, private configService: ConfigService){

        this.token_expiration_time = this.configService.get('token_expiration_time');

    }

    private getTokenExpirationDate(): number{
        return Math.ceil(Date.now() / 1000 + this.token_expiration_time)
    }

    async login(data: LoginUserDto){
        
        if (data.email && data.password){
            const user = await this.usersService.findUserByEmail(data.email)
            if (user){
                const match = await bcrypt.compare(data.password, (await user).password)
                if (match){
                    const token_expiration:number = this.getTokenExpirationDate()
                    return {
                        email: data.email,
                        exp: token_expiration,
                        token: this.jwtService.sign({ email: data.email, sub: user.id})
                    }

                }
                  
            }
        }
        throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED)
    }

    async forgotPassword(): Promise<string>{
        return "Forgot Password"
    }
}
