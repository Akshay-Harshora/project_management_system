import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse, getMessageByCode } from '../helper';

export class ResponseUtil {
  static success<T>(
    data?: T,
    message?: string,
    statusCode?: number,
    error?: string
  ): IResponse<T> {
    return {
      data,
      message,
      statusCode,
      error
    };
  }
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data: IResponse<T>) => {
        const responseData = data && data.data;
        const message = data?.message
          ? getMessageByCode(data.message)
          : undefined;

        return {
          data: responseData,
          message: message,
          statusCode: data.statusCode
        };
      })
    );
  }
}
