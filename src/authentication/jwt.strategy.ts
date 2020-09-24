import { UsersService } from './../users/users.service';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import appConfig from "./../configs/appconfig";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.app_key,
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