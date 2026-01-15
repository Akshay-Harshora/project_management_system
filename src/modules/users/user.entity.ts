import { BaseEntity } from 'src/database/entities/base.entity';
import { Role } from 'src/helper/enum';
import {
  Entity,
  Column,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
