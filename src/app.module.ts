import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from "./configs/appconfig";
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { FileuploadModule } from './fileupload/fileupload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database')
        return { ...dbConfig, autoLoadEntities: true }
      }
    }),
    AuthenticationModule,
    UsersModule,
    FileuploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
