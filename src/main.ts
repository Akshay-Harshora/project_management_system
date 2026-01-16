import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response-interceptor';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());

  function getFirstError(
    errors: ValidationError[],
    parentPath = ''
  ): { path: string; message: string } {
    const error = errors[0];
    const currentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      const msg = Object.values(error.constraints)[0];
      return { path: currentPath, message: msg };
    }

    if (error.children?.length) {
      return getFirstError(error.children, currentPath);
    }

    return { path: currentPath, message: '' };
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const { path, message } = getFirstError(errors);
        return new BadRequestException(`${path}: ${message}`);
      }
    })
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
