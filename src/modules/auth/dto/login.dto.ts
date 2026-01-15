import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';
import { ErrorMessages, ErrorType } from 'src/helper';

export class LoginUserDto {
  @IsEmail({}, { message: ErrorMessages[ErrorType.InvalidEmail] })
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
