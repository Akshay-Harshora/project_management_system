import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/user.entity';
import { ErrorMessages, ErrorType, UserDetails, Role } from 'src/helper';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenPayload } from '../interfaces/auth-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    console.log('Initializing JWT Strategy');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_LOGIN_SECRET!
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserDetails> {
    console.log('JWT Strategy - validate called with payload:', payload);
    const result = await this.usersRepository.findOne({
      where: { id: payload.sub }
    });
    console.log('User fetched from DB:', result);
    if (!result) {
      throw new UnauthorizedException(ErrorMessages[ErrorType.UserNotFound]);
    }
    return {
      id: result.id,
      email: result.email,
    };
  }
}
