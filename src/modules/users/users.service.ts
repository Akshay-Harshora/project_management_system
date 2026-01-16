import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ErrorMessages, ErrorType } from 'src/helper';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async register(data: any) {
        console.log("Registering user with data:", data);

        const newUser = await this.userRepo.exists({
            where: { email: data.email }
          });
          if (newUser) {
            throw new BadRequestException({
              error: ErrorType.UserAlreadyExist,
              message: ErrorMessages[ErrorType.UserAlreadyExist]
            });
          }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log("Hashed password:", hashedPassword);
        const user = this.userRepo.create({
            ...data,
            password: hashedPassword,
        });
        return this.userRepo.save(user);
    }
}

