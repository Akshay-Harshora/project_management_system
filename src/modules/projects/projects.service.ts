import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ErrorMessages, ErrorType, ProjectStatus } from "src/helper";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>
    ) { }

    async create(dto: CreateProjectDto, userId: number) {

        const project = this.projectRepo.create({
            ...dto,
            user_id: userId,
        });

        return this.projectRepo.save(project);
    }

    async findAll() {
        return this.projectRepo.find();
    }

    async findOne(id: number) {
        return this.projectRepo.findOne({ where: { id } });
    }

    async update(id: number, dto: UpdateProjectDto, userId: number) {
        const project = await this.findOne(id);

        if (!project) throw new NotFoundException({
            error: ErrorType.ProjectNotExist,
            message: ErrorMessages[ErrorType.ProjectNotExist]
        });

        if (project.user_id !== userId) {
            throw new ForbiddenException({
                error: ErrorType.NotProjectOwner,
                message: ErrorMessages[ErrorType.NotProjectOwner]
            });
        }

        Object.assign(project, dto);
        return this.projectRepo.save(project);
    }

    async remove(id: number, userId: number) {
        const project = await this.findOne(id);

        if (!project) throw new NotFoundException({
            error: ErrorType.ProjectNotExist,
            message: ErrorMessages[ErrorType.ProjectNotExist]
        });

        if (project.user_id !== userId) {
            throw new ForbiddenException({
                error: ErrorType.NotProjectOwner,
                message: ErrorMessages[ErrorType.NotProjectOwner]
            });
        }

        project.status = ProjectStatus.ARCHIVED;
        return this.projectRepo.save(project);
    }
}
