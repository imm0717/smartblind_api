import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  * as config  from './configs/ormconfig';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...config, 
      keepConnectionAlive: true,
      autoLoadEntities: true
    }), AuthenticationModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
