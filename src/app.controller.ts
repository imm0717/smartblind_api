import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly appConfig: ConfigService) {}

  @Get()
  getHello(): string {
    return this.appConfig.get('app_key');
  }
}
