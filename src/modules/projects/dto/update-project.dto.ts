import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../../../helper';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}
