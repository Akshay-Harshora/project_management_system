import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { AuthenticatedUser } from './interfaces/auth-user.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService

  ) {}

  async validateUser(
    loginUserDto: LoginUserDto
  ): Promise<AuthenticatedUser | null> {
    const { email, password: plainPassword } = loginUserDto;

    console.log("email and password", email, plainPassword);
    const user = await this.usersRepository
    .createQueryBuilder('user')
    .addSelect('user.password') // Forces the hidden password field to be included
    .where('user.email = :email', { email: loginUserDto.email })
    .getOne();

    console.log("user print", user);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(plainPassword, user.password);
    if (!passwordMatch) return null;

    const { password, ...rest } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
    return rest as any;
  }

  async login(user: AuthenticatedUser): Promise<{ accessToken: string }> {
    console.log('Generating JWT for user:', user);
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token
    };
  }
}
