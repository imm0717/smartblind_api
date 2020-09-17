import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from "./configs/appconfig";
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[appConfig]
    }),
    TypeOrmModule.forRoot(appConfig().database), AuthenticationModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { 
  constructor(){
    console.log(appConfig().database); 
  }
}
