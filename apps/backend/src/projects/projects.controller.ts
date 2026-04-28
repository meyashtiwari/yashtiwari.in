import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  @Get()
  index() {
    return {};
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { id };
  }

  @Post('create')
  store(@Body() createProjectDto: CreateProjectDto) {
    return {
      ...createProjectDto,
    };
  }
}
