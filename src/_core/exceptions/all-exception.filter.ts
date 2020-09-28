import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException | Error, context: ArgumentsHost) {

        const response = context.switchToHttp().getResponse()
        const statusCode = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const exceptionData = (exception instanceof HttpException) ? exception.getResponse() : `${(exception as Error).name} | ${(exception as Error).message} `

        console.log(exception)

        response.status(statusCode).json({
            statusCode: statusCode,
            timestamp: new Date(Date.now()),
            data: exceptionData,
            isSuccess: false
        })
    }

}