import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import appConfig from "./../configs/appconfig";
import appConstants from "../constants";
@Module({
  imports: [UsersModule, 
    PassportModule,
    JwtModule.register({
    secret: appConfig.app_key,
    signOptions: { expiresIn: '1h' }
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy]
})
export class AuthenticationModule {}
