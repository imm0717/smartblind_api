import { ConfigService } from '@nestjs/config';
import { UsersService } from './../users/users.service';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userService: UsersService, configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('app_key')
        })
    }

    async validate(payload: any){

        const user = await this.userService.findUserByEmail(payload.email)
        if (user){
            const {password, ...result} = user
            return result
        }
        return null
    }
}