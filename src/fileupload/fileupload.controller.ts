import { Body, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    async uploadFile(@UploadedFile() file) {
        return file.path
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('file', 10, {
        storage: diskStorage({
            destination: './upload',
            filename: editFileName
        }),
        fileFilter: imageFilterFile
    }))
    async uploadFiles(@UploadedFiles() files) {
        const paths: string[] = []
        files.forEach(file => {
            paths.push(file.path)
        });

        return paths
    }

    @Get(':imgpath')
    async seeUploadedFile(@Param('imgpath') imgpath: string, @Res() res) {

        return res.sendFile(imgpath, { root: './upload' })
    }

}
