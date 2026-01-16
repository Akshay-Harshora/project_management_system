import { Module } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity';
import { ProjectController } from './projects.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectsModule {}
