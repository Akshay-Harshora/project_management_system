import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectService } from "./projects.service";
import { CurrentUser } from "src/decorators/current-user.decorator";
import type { IResponse, UserDetails } from "src/helper";
import { ResponseUtil } from "src/interceptors/response-interceptor";
import { ProjectsOperation } from "src/helper/enum";

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  create(@Body() dto: CreateProjectDto, @CurrentUser() user: UserDetails) {
    const data = this.projectService.create(dto, user.id);

    return ResponseUtil.success(
        data,
        ProjectsOperation.CREATED,
        HttpStatus.CREATED,
      );
  }

  @Get()
  async findAll(): Promise<IResponse<any>> {
    const data = await this.projectService.findAll();

    return ResponseUtil.success(
      data,
      ProjectsOperation.FETCHED,
      HttpStatus.OK,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.projectService.findOne(+id);

    return ResponseUtil.success(
      data,
      ProjectsOperation.FETCHED,
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProjectDto,
    @CurrentUser() user: UserDetails,
  ) {
    const data = await this.projectService.update(+id, dto, user.id);

    return ResponseUtil.success(
      data,
      ProjectsOperation.UPDATED,
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() user: UserDetails) {
    const data = await this.projectService.remove(+id, user.id);

    return ResponseUtil.success(
      data,
      ProjectsOperation.DELETED,
      HttpStatus.OK,
    );
  }
}
