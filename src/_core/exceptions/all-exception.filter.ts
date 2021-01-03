import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException | Error, context: ArgumentsHost) {

        const response = context.switchToHttp().getResponse()
        const statusCode = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const exceptionData = (exception instanceof HttpException) ? exception.getResponse() : `${(exception as Error).name} | ${(exception as Error).message} `

        response.status(statusCode).json({
            timestamp: new Date(Date.now()),
            message: exceptionData,
            isSuccess: false
        })
    }

}