import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class BulkCreateProjectsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects: CreateProjectDto[];
}

