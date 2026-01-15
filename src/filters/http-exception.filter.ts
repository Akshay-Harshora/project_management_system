import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorMessages, IResponse } from 'src/helper';
import { ErrorType } from 'src/helper/enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ErrorMessages[ErrorType.InternalServerError];
    let error = ErrorType.InternalServerError;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message = exceptionResponse['message'];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error = exceptionResponse['error'];
    }

    const responseBody: IResponse<null> = {
      error,
      message,
      statusCode: status
    };

    httpAdapter.reply(response, responseBody, status);
  }
}
