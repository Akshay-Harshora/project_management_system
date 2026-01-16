import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
  import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
  import { AccessTypes, ErrorMessages, ErrorType } from 'src/helper';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
      super();
    }
  
    canActivate(context: ExecutionContext) {
      const accessType = this.reflector.getAllAndOverride<AccessTypes>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()]
      );
  
      console.log('JWT Auth Guard - canActivate called. Access Type:', accessType);
      if (accessType === AccessTypes.PUBLIC) {
        return true;
      }
      console.log('JWT Auth Guard - Proceeding with authentication'); 
      const request = context.switchToHttp().getRequest();
      console.log('Auth Header:', request.headers.authorization);
      return super.canActivate(context);
    }
  
    handleRequest(err: any, user: any, info: any) {
      console.log('JWT Auth Guard - handleRequest called with user:', info);
      if (err || !user) {
        throw new UnauthorizedException(ErrorMessages[ErrorType.InvalidToken]);
      }
      return user; // eslint-disable-line @typescript-eslint/no-unsafe-return
    }
  }
  