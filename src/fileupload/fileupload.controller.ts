import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { imageFilterFile, editFileName } from "./fileupload.utils";

@Controller('file')
export class FileuploadController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: editFileName
        }),
        fileFilter: imageFilterFile
    }))
    async uploadFile(@UploadedFile() file){
        return file.path
    }
}
