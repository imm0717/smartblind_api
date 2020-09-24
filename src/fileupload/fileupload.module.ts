import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileuploadController } from './fileupload.controller';

@Module({
  imports: [MulterModule.register()],
  controllers: [FileuploadController]
})
export class FileuploadModule {}
