import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ErrorMessages, ErrorType } from 'src/helper';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email'});
  }

  async validate(email: string, password: string): Promise<any> {
    console.log("print start");
    const loginUserDto = plainToInstance(LoginUserDto, { email, password });

    console.log("print after plain to instance", loginUserDto);

    const errors = await validate(loginUserDto);

    console.log("print after validate", errors);
    if (errors.length > 0) {
      const firstError = errors[0];
      const constraints = firstError.constraints;
      const message = constraints
        ? Object.values(constraints)[0]
        : ErrorMessages[ErrorType.InvalidCredentials];

      throw new UnauthorizedException(message);
    }

    console.log("print before validate user", loginUserDto);
    const user = await this.authService.validateUser(loginUserDto);
    console.log("print after validate user", user);
    if (!user) {
      throw new UnauthorizedException(
        ErrorMessages[ErrorType.InvalidCredentials]
      );
    }
    return user;
  }
}
