import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

    constructor(private readonly usersService: UsersService, private jwtService: JwtService){

    }

    async login(data: LoginUserDto){
        if (data.email && data.password){
            const user = await this.usersService.findUserByEmail(data.email)
            if (user){
                const match = await bcrypt.compare(data.password, (await user).password)
                if (match)
                  return {
                      access_token: this.jwtService.sign({ email: data.email, sub: user.id})
                  }
            }
        }
        throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED)
    }

    async forgotPassword(): Promise<string>{
        return "Forgot Password"
    }
}
