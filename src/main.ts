import { AllExceptionFilter } from './_core/exceptions/all-exception.filter';
import { ResponseInterceptor } from './_core/interceptors/response.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters( new AllExceptionFilter())
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
